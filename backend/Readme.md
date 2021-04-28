# think-it-backend

### This is the GraphQl api _(expect bugs)_

### How to make this work ?
- Fill out all the values from **.env.example** file and add it to a **.env** file
- You'll need an email for nodemailer to be able to send tokens for changing passwords. You can configure node mailer to use your email providers account, or use a fake smpt service like [Ethereal](https://ethereal.email/)

### For dev
`npm run watch`
Will watch for the changes in your `.ts` files and spit out the corresponding js file in `.dist` folder

`npm run dev`
The dev server will start at [http://localhost/4000/graphql](http://localhost/4000/graphql)

### For prod
```sh
npm run build
npm run start
```
Srver will start at [http://localhost/4000/graphql](http://localhost/4000/graphql)