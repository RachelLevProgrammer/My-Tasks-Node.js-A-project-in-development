const Task = require('../Models/TaskModel'); // תתאים לנתיב שלך
const { sendMail } = require('./mailer');

const checkAndSendEmails = async () => {
  const now = new Date();

  // חפש משימות שזמן ההתחלה שלהן קרוב לזמן הנוכחי (לדוגמה, בתוך הדקה הקרובה)
  const tasks = await Task.find({
    startDate: {
      $gte: new Date(now.getTime() - 60000), // דקה אחורה
      $lte: new Date(now.getTime() + 60000)  // דקה קדימה
    },
    emailSent: { $ne: true } // שעדיין לא שלחנו מייל עבורן
  });

  for (const task of tasks) {
    await sendMail({
      to: task.userEmail,
      subject: `Reminder for your task: ${task.title}`,
      text: `Your task "${task.title}" is scheduled to start now.`,
      html: `<p>Your task "<b>${task.title}</b>" is scheduled to start now.</p>`
    });

    // עדכן את המשימה שסימנת מייל נשלח
    task.emailSent = true;
    await task.save();
  }
};

module.exports = { checkAndSendEmails };
