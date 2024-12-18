import UserMessageLimit from '../models/UserMessageLimit.js';

export const checkMessageLimit = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'User authentication required' });
        }
        
        const userId = req.user.id;
        const currentTime = new Date();

        let userLimit = await UserMessageLimit.findOne({ user: userId });
        if (!userLimit) {
            userLimit = await UserMessageLimit.create({
                user: userId,
                messageCount: 0,
                lastMessageTimestamp: currentTime,
                cooldownUntil: null
            });
        }

        // Check if still in cooldown
        if (userLimit.cooldownUntil) {
            const cooldownTime = new Date(userLimit.cooldownUntil);
            if (currentTime < cooldownTime) {
                const remainingMs = cooldownTime - currentTime;
                const remainingMinutes = Math.ceil(remainingMs / (1000 * 60));
                let timeWord;
                if (remainingMinutes === 1) {
                    timeWord = 'دقيقة';
                } else if (remainingMinutes === 2) {
                    timeWord = 'دقيقتين';
                } else if (remainingMinutes >= 3 && remainingMinutes <= 10) {
                    timeWord = 'دقائق';
                } else {
                    timeWord = 'دقيقة';
                }
                const cooldownMessage = `يرجى الانتظار ${remainingMinutes} ${timeWord} قبل إرسال رسالة جديدة`;
                console.log('Cooldown active:', cooldownMessage);
                return res.status(429).json({
                    message: cooldownMessage,
                    cooldownRemaining: remainingMs,
                    cooldownUntil: cooldownTime.getTime()
                });
            } else {
                // Cooldown has expired, reset everything
                userLimit.messageCount = 0;
                userLimit.cooldownUntil = null;
            }
        }

        // Check message count and apply cooldown if needed
        if (userLimit.messageCount >= 10) { // After 10 messages (0-9)
            console.log('Reached limit, setting cooldown');
            userLimit.cooldownUntil = new Date(currentTime.getTime() + (5 * 60 * 1000)); // 20 minutes
            await userLimit.save();

            const limitMessage = 'لقد تجاوزت الحد المسموح به للرسائل. يرجى الانتظار 5 دقيقة';
            console.log('Limit reached:', limitMessage);
            return res.status(429).json({
                message: limitMessage,
                cooldownRemaining: 5 * 60 * 1000, // 20 minutes in milliseconds
                cooldownUntil: userLimit.cooldownUntil.getTime()
            });
        }

        // Increment message count
        userLimit.messageCount += 1;
        userLimit.lastMessageTimestamp = currentTime;
        await userLimit.save();

        console.log('Current message count:', userLimit.messageCount);
        next();
    } catch (error) {
        console.error('Message limit check error:', error);
        res.status(500).json({ message: 'خطأ في التحقق من حدود الرسائل' });
    }
};
