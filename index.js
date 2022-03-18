import { exec } from "child_process";
const urls = [];
urls.push("https://truck-hero.com/");
exec(
 "curl https://truck-hero.com/sitemaps/categories.xml",
 (error, stdout, stderr) => {
  const regex = /<loc>(.*?)<\/loc>/g;
  const content = stdout;
  let check;

  do {
   check = regex.exec(content);
   if (check && check[1]) {
    urls.push(check[1]);
   }
  } while (check);

  let i = 0;
  const inte = setInterval(() => {
   console.log(urls[i]);
   exec(`curl -X PURGE ${urls[i]}`, (error, stdout, stderr) => {
    console.log(`response: ${stdout}`);
   });
   i++;
   if (i >= urls.length) {
    clearInterval(inte);
   }
  }, 1000);
 }
);
