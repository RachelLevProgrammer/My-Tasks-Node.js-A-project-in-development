const User = require('./Models/UserModel');
const sendTaskEmail = require('./emailService').sendTaskEmail;

async function checkAndSendTaskEmails() {
    console.log('Running checkAndSendTaskEmails at', new Date());

    try {
      console.log('== Checking Task ==');
  
      const users = await User.find().populate('calendar');
      const now = new Date();
  
      for (const user of users) {
        for (const task of user.calendar) {
          console.log('User:', user.email);
          console.log('Task:', task.name, task.date, task.startTime, task.wayOfActing);
      
          const taskDateTime = new Date(task.date);
          const [hours, minutes] = task.startTime.split(':');
          taskDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
          const now = new Date();
          console.log('Now:', now);
          console.log('Task DateTime:', taskDateTime);
      
          const timeDiff = now - taskDateTime;
          console.log('Diff (ms):', timeDiff);
      
          if (task.wayOfActing === 'email' && timeDiff >= 0 && timeDiff < 10 * 60000) {
            console.log('Sending email...');
            await sendTaskEmail(user.email, task.name, task.issueTask);
          }
        }
      }
          } catch (error) {
      console.error('Error checking/sending task emails:', error);
    }
  }
  
// מפעילים כל דקה את הבדיקה
setInterval(checkAndSendTaskEmails, 60000);
