# Hospital Website

## Disclaimer
The site URL index page can be seen here hosted on [railway](https://hospital-website.up.railway.app/), but any other page **will not load**, as the Heroku / ClearDB database I was using is no longer available for free, as of December 18, 2023. The info given below is otherwise still accurate from an educational standpoint, and there a variety of other database vendors that may offer free or cheap plans (do your own research). If you pick a nonrelational database vendor like MongoDB, the SQL code as written below will need adjustments, as [seen here](https://web.engr.oregonstate.edu/~hessro/teaching/cs493-sp22#Using-MongoDB-to-Store-API-Data).

## About

Proof of concept CRUD (Create, Read, Update, Delete) site, with database interaction.

The site is meant to be used by a theoretical hospital. The user is able to insert new entries, update entries, delete entries, search and view existing entries for a variety of hospital-related applications.

### Technologies Used:

- SQL (ClearDB) for database management
- NodeJS for backend
- Express Handlebars used for frontend templating of recurring site features
- Deployed on [Railway](https://railway.app/)

### Database Design

- [Entity Relationships Diagram](https://i.ibb.co/HFznKKY/erd.png)
- [Schema](https://i.ibb.co/z6M2f8p/schema.png)
- The final SQL implementation can be viewed in the `ddqheroku.sql` file [here](https://github.com/solderq35/hospital-website/blob/renderbranch/ddqheroku.sql).

## Screenshots

Screenshot of Pharmacy page:
![Overview](https://i.ibb.co/pwt08vx/pharmacy.png)

Screenshot of Pharmacy Page after Searching for pharmacy named "Kroger":
![Search](https://i.ibb.co/jZPzR26/pharmacysearch.png)

Screenshot of Pharmacy page after filling out the "Add new Pharmacy" form and adding a new Pharmacy "Johnson Pharmacy": ![Add](https://i.ibb.co/VMbPDWD/pharmacyadd.png)

Screenshot of Pharmacy page after deleting " Albertsons" pharmacy:
![Delete](https://i.ibb.co/10j9dGJ/deletepharmacy.png)

Screenshot of Pharmacy Update Page after clicking on "Update" for pharmacy "Wallgreens&":
![Update](https://i.ibb.co/6gJhyPh/updatepharmacy.png)

Screenshot of Pharmacy page after I updated "Wallgreens&" pharmacy to have the name "Wallgreens" instead:
![Update2](https://i.ibb.co/9sNZrwC/updatepharmacy2.png)

## Usage Setup

**SQL Database Setup**

- [Helpful Video Guide](https://youtu.be/ZZp0VIjTsbM)
  - This video isn't 100% matching this project's use case but still a lot there that helps. Refer to the video if instructions below confuse.
- Make Heroku account and ClearDB account (Even though we deploy on Render.com, we need Heroku for the free ClearDB database add-on).
- Install MySQL Workbench or similar SQL tool, log in to your ClearDB database in MySQL Workbench. Run the file `ddqheroku.sql` (found in the project root directory [here](https://github.com/solderq35/hospital-website/blob/renderbranch/ddqheroku.sql)) in MySQL Workbench to initiate the database creation and populate it with sample data.
- Create `dbcon.js` file using your ClearDB credentials, with `dbdon.js.example` file (in root directory) as a template.
- If you ever need to debug the SQL database, you can try running some of the commands found in the `dmq.sql` file [here](https://github.com/solderq35/hospital-website/blob/renderbranch/dmq.sql).

**How to Run Locally**

- Run `yarn` to install node modules.
- Run `npm start` to test the website locally.

**How to Deploy**

- Currently deployed on [Railway](https://railway.app/)
- **Optional Security Measure**: I made a duplicate, **private** cloned repository that was identical to the public repository. I removed `dbcon.js` from the public repository, while keeping `dbcon.js` in the private repository. I deployed from the private repository to prevent my credentials from being leaked, and I made sure that the public repository had `dbcon.js` listed in the `.gitignore`.
  - Another approach is to make a local (not remote) Git branch and keep your credentials there.
