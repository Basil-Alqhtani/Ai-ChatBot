# Ai-ChatBot
This AI-powered chatbot is trained to provide accurate information and answer questions about the College of Telecom and Information in Jeddah. It understands natural language and interacts seamlessly, offering a human-like conversational experience.

# Smart Chat - Full-Stack AI Chatbot Application


##بالعربي  

### 1. Clone the Repository
```bash
https://github.com/Basil-Alqhtani/Ai-ChatBot.git

```
   
### 2. Install Dependencies         
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory with the following variables:
```
OPENAI_API_KEY=your_openai_api_key
ASSISTANT_ID=your_openai_assistant_id
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the Application
```bash
npm start
```


## 🔑 Account Prerequisites

### 1. MongoDB Atlas Account Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account
3. Create a new cluster:
   - Choose the free tier (M0 Sandbox)
   - Select a cloud provider (AWS/Google Cloud/Azure)
4. Create a database user:
   - Go to Database Access
   - Add a new database user
   - Note down your username and password
5. Set up network access:
   - Whitelist your IP address or choose "Access from Anywhere" for development

### 2. OpenAI Account Setup
1. Visit [OpenAI Platform](https://platform.openai.com/signup)
2. Create an account
3. Navigate to API Keys section
4. Generate a new API key
5. Create an Assistant:
   - Go to [OpenAI Assistants](https://platform.openai.com/assistants)
   - Create a new Assistant
   - Note down the Assistant ID

### 3. Train the assistant in the knowledge 

1. Go to Assistant settings → Instructions section 

2. Copy and paste your system instructions in the [instructions.txt](model_training/instructions.txt)


3. Click "Save"


### 4 Add Knowledge Base

1. Navigate to tools under the file search turn it on 

2. Click " + files "

3. Upload your Knowledge Base files that can be found in [knowledge](model_training/knowledge)

4.  Wait for processing to complete


## 🛠 Model Flexibility

In `server.js`, you can easily change the AI model by modifying the OpenAI configuration:

```javascript
// Example of changing the model in the conversation route
const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: process.env.ASSISTANT_ID,
    // Optional: Specify a different model if needed
    model: "gpt-4-turbo", // or "gpt-4-mini", "gpt-3.5-turbo"
});
```

Key points about model selection:
- Different models have varying capabilities and pricing
- `gpt-4-turbo` offers advanced reasoning
- `gpt-3.5-turbo` is more cost-effective
- Check OpenAI documentation for the latest model options

# Smart Chat - Full-Stack AI Chatbot Application

## 📝 Project Overview

This is a full-stack AI chatbot application built with Node.js, Express, MongoDB, and OpenAI's Assistant API. The application provides user authentication and an AI-powered conversational interface.

## ✨ Features

- User Registration and Authentication
- Protected AI Conversation Endpoint
- Message Limit Middleware
- MongoDB Database Integration
- JWT-based Authentication
- OpenAI Assistant Integration

## 🛠 Technologies Used

- **Backend**: 
  - Node.js
  - Express.js
- **Database**: 
  - MongoDB (with Mongoose)
- **Authentication**: 
  - JWT (JSON Web Tokens)
  - bcryptjs for password hashing
- **AI Integration**: 
  - OpenAI Assistant API
- **Additional Libraries**:
  - cors
  - dotenv
  - body-parser

## 📋 Prerequisites

- Node.js (v14 or later)
- MongoDB Atlas account
- OpenAI API key
- Git



## 🔐 Authentication Endpoints

### Register
- **URL**: `/auth/register`
- **Method**: POST
- **Payload**: 
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

### Login
- **URL**: `/auth/login`
- **Method**: POST
- **Payload**: 
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

## 💬 Conversation Endpoint

### Start Thread
- **URL**: `/start-thread`
- **Method**: POST
- **Headers**: `Authorization: Bearer <token>`

### Send Message
- **URL**: `/conversation`
- **Method**: POST
- **Headers**: `Authorization: Bearer <token>`
- **Payload**:
  ```json
  {
    "threadId": "thread_id_from_start_thread",
    "message": "Your message here"
  }
  ```

## 🛡 Message Limit

The application implements a message limit middleware to prevent abuse. Users are restricted in the number of messages they can send within a specific timeframe.

## 🔍 Project Structure

- `server.js`: Main server configuration
- `routes/auth.js`: Authentication routes
- `models/User.js`: User data model
- `middleware/auth.js`: JWT authentication middleware
- `middleware/checkMessageLimit.js`: Message limit middleware

## 🚧 Security Considerations

- Passwords are hashed using bcrypt
- JWT for secure authentication
- Environment variables for sensitive information
- CORS configuration
- Message rate limiting

## 📦 Dependencies

Refer to `package.json` for complete dependency list. Key dependencies include:
- Express
- Mongoose
- OpenAI
- bcryptjs
- jsonwebtoken
-----------------------------------------------------------------------------------
# Ai-ChatBot  
روبوت دردشة مدعوم بالذكاء الاصطناعي تم تدريبه لتوفير معلومات دقيقة والإجابة على الأسئلة المتعلقة بكلية الاتصالات والمعلومات في جدة. يتميز بفهم اللغة الطبيعية والتفاعل بسلاسة لتقديم تجربة محادثة شبيهة بالبشر.

# Smart Chat - تطبيق روبوت دردشة كامل يعتمد على الذكاء الاصطناعي

## **بالعربي**

### 1. استنساخ المستودع
```bash
https://github.com/Basil-Alqhtani/Ai-ChatBot.git
```

### 2. تثبيت المتطلبات
```bash
npm install
```

### 3. إعداد ملف البيئة
قم بإنشاء ملف `.env` في المجلد الرئيسي يحتوي على المتغيرات التالية:
```
OPENAI_API_KEY=your_openai_api_key
ASSISTANT_ID=your_openai_assistant_id
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. تشغيل التطبيق
```bash
npm start
```

---

## 🔑 **متطلبات الحساب**

### 1. إعداد حساب MongoDB Atlas
1. انتقل إلى [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)  
2. أنشئ حسابًا مجانيًا  
3. قم بإنشاء مجموعة بيانات جديدة:
   - اختر الخطة المجانية (M0 Sandbox)  
   - حدد مقدم الخدمة السحابية (AWS أو Google Cloud أو Azure)  
4. أنشئ مستخدمًا لقاعدة البيانات:
   - انتقل إلى "الوصول إلى قاعدة البيانات" (Database Access)  
   - أضف مستخدمًا جديدًا  
   - احفظ اسم المستخدم وكلمة المرور  
5. قم بإعداد الوصول للشبكة:
   - أضف عنوان IP الخاص بك أو اختر "الوصول من أي مكان" للتطوير.  

### 2. إعداد حساب OpenAI
1. قم بزيارة [منصة OpenAI](https://platform.openai.com/signup)  
2. أنشئ حسابًا  
3. انتقل إلى قسم مفاتيح الـ API  
4. أنشئ مفتاح API جديدًا  
5. أنشئ مساعدًا (Assistant):
   - انتقل إلى [OpenAI Assistants](https://platform.openai.com/assistants)  
   - أنشئ مساعدًا جديدًا  
   - احفظ معرف المساعد (Assistant ID).
   - ### 3. تدريب المساعد على المعرفة  
1. انتقل إلى إعدادات المساعد → قسم التعليمات  
2. انسخ والصق تعليمات النظام من [instructions.txt](model_training/instructions.txt)  
3. اضغط "حفظ"  

### 4. إضافة قاعدة المعرفة  
1. انتقل إلى الأدوات تحت خيار البحث في الملفات وقم بتفعيله  
2. اضغط على " + ملفات "  
3. قم برفع ملفات قاعدة المعرفة الموجودة في [knowledge](model_training/knowledge)  
4. انتظر حتى تكتمل المعالجة  
 

---

## 🛠 **مرونة النماذج**

يمكنك بسهولة تغيير نموذج الذكاء الاصطناعي المستخدم في `server.js` عبر تعديل إعدادات OpenAI:  

```javascript
// مثال على تغيير النموذج في مسار المحادثة
const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: process.env.ASSISTANT_ID,
    // اختياري: تحديد نموذج مختلف إذا لزم الأمر
    model: "gpt-4-turbo", // أو "gpt-4-mini", "gpt-3.5-turbo"
});
```

**نقاط هامة عن اختيار النماذج:**
- النماذج المختلفة تمتلك قدرات وأسعارًا متفاوتة.  
- `gpt-4-turbo` يقدم تحليلًا واستنتاجًا متقدمًا.  
- `gpt-3.5-turbo` أكثر كفاءة من حيث التكلفة.  
- راجع وثائق OpenAI للحصول على أحدث خيارات النماذج.  

---

## 📝 **نظرة عامة على المشروع**

هذا تطبيق روبوت دردشة كامل يعتمد على الذكاء الاصطناعي تم تطويره باستخدام Node.js وExpress وMongoDB وواجهة OpenAI Assistant API. يوفر التطبيق مصادقة للمستخدمين وواجهة محادثة تعمل بالذكاء الاصطناعي.

---

## ✨ **المميزات**

- تسجيل المستخدمين وتسجيل الدخول.  
- نقطة نهاية محمية لإجراء المحادثات.  
- وسيط للحد من عدد الرسائل.  
- تكامل مع قاعدة بيانات MongoDB.  
- مصادقة باستخدام JWT (الرموز المميزة).  
- تكامل مع OpenAI لتوفير محادثات تعمل بالذكاء الاصطناعي.

---

## 🛠 **التقنيات المستخدمة**

- **الخلفية (Backend)**:  
  - Node.js  
  - Express.js  

- **قاعدة البيانات**:  
  - MongoDB (باستخدام Mongoose)  

- **المصادقة**:  
  - JWT (الرموز المميزة)  
  - bcryptjs لتشفير كلمات المرور  

- **تكامل الذكاء الاصطناعي**:  
  - OpenAI Assistant API  

- **مكتبات إضافية**:  
  - cors  
  - dotenv  
  - body-parser  

---

## 📋 **المتطلبات الأساسية**

- Node.js (الإصدار 14 أو أحدث).  
- حساب MongoDB Atlas.  
- مفتاح OpenAI API.  
- Git.

---

## 🔐 **نقاط نهاية المصادقة**

### تسجيل مستخدم جديد
- **العنوان**: `/auth/register`  
- **الطريقة**: POST  
- **المعلومات المطلوبة**:  
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

### تسجيل الدخول
- **العنوان**: `/auth/login`  
- **الطريقة**: POST  
- **المعلومات المطلوبة**:  
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

---

## 💬 **نقاط نهاية المحادثة**

### بدء محادثة جديدة
- **العنوان**: `/start-thread`  
- **الطريقة**: POST  
- **الرؤوس المطلوبة**:  
  `Authorization: Bearer <token>`

### إرسال رسالة
- **العنوان**: `/conversation`  
- **الطريقة**: POST  
- **الرؤوس المطلوبة**:  
  `Authorization: Bearer <token>`  
- **المعلومات المطلوبة**:  
  ```json
  {
    "threadId": "thread_id_from_start_thread",
    "message": "Your message here"
  }
  ```

---

## 🛡 **حدود الرسائل**

يحتوي التطبيق على وسيط للحد من الرسائل لمنع الإساءة. يتم تقييد عدد الرسائل التي يمكن للمستخدم إرسالها خلال فترة زمنية محددة.

---

## 🔍 **هيكل المشروع**

- `server.js`: إعدادات الخادم الرئيسية.  
- `routes/auth.js`: مسارات المصادقة.  
- `models/User.js`: نموذج بيانات المستخدم.  
- `middleware/auth.js`: وسيط مصادقة JWT.  
- `middleware/checkMessageLimit.js`: وسيط الحد من الرسائل.  

---

## 🚧 **اعتبارات الأمان**

- كلمات المرور مشفرة باستخدام bcrypt.  
- استخدام JWT للمصادقة الآمنة.  
- الاعتماد على متغيرات البيئة للمعلومات الحساسة.  
- إعدادات CORS للحماية.  
- تحديد معدل الرسائل.  

---

## 📦 **المكتبات المعتمدة**

راجع `package.json` للحصول على القائمة الكاملة للمكتبات المستخدمة. من المكتبات الرئيسية:  
- Express  
- Mongoose  
- OpenAI  
- bcryptjs  
- jsonwebtoken
