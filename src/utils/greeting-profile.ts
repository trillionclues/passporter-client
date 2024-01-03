const currentTime = new Date().getHours();
let userGreeting: string;

if (currentTime < 12) {
  userGreeting = "Good morning";
} else if (currentTime < 18) {
  userGreeting = "Good afternoon";
} else {
  userGreeting = "Good evening";
}

export default userGreeting;
