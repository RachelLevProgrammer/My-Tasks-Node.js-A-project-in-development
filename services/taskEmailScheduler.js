const User = require('./Models/UserModel');
const sendTaskEmail = require('./emailService').sendTaskEmail;

async function checkAndSendTaskEmails() {
  try {
    // מוציאים את כל המשתמשים
    const users = await User.find().populate('calendar');

    const now = new Date();

    for (const user of users) {
      for (const task of user.calendar) {
        // השוואת תאריך ושעה בין עכשיו לזמן של המשימה
        const taskDateTime = new Date(task.date);
        const [hours, minutes] = task.startTime.split(':');
        taskDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        // אם עכשיו עבר את זמן המשימה (או קרוב אליו - לדוגמה, בתוך דקה)
        const timeDiff = now - taskDateTime;
        if (timeDiff >= 0 && timeDiff < 60000) {  // בתוך דקה
          // שולחים מייל
          await sendTaskEmail(
            user.email,
            task.name,        // נושא המייל = שם המשימה
            task.issueTask    // תוכן המייל = תיאור המשימה
          );
        }
      }
    }
  } catch (error) {
    console.error('Error checking/sending task emails:', error);
  }
}

// מפעילים כל דקה את הבדיקה
setInterval(checkAndSendTaskEmails, 60000);
