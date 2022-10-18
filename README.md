# Hospital Website

## Site URL (Try it Yourself!)
- **https://hospital-website2-production.up.railway.app/** (main URL)
- **https://hospital-website.glitch.me/** (backup, slow startup time)

## About

Proof of concept CRUD (Create, Read, Update, Delete) site, with database interaction.

The site is meant to be used by a theoretical hospital. The user is able to insert new entries, update entries, delete entries, search and view existing entries for a variety of hospital-related applications.

### Technologies Used:

- SQL (ClearDB) for database management
- NodeJS for backend
- Express Handlebars used for frontend templating of recurring site features
- Deployed on [Railway](https://railway.app/)

### Database Design

- [Entity Relationships Diagram](https://media.discordapp.net/attachments/833505136290299935/1013128131256787106/unknown.png)
- [Schema](https://media.discordapp.net/attachments/833505136290299935/1013128945656418435/unknown.png?width=548&height=669)
- The final SQL implementation can be viewed in the `ddqheroku.sql` file [here](https://github.com/solderq35/hospital-website/blob/renderbranch/ddqheroku.sql).

## Screenshots

Screenshot of Pharmacy page:
![Overview](https://media.discordapp.net/attachments/833505136290299935/993971873102712952/unknown.png?width=715&height=670)

Screenshot of Pharmacy Page after Searching for pharmacy named "Kroger":
![Search](https://media.discordapp.net/attachments/833505136290299935/993972274262720532/unknown.png?width=729&height=670)

Screenshot of Pharmacy page after filling out the "Add new Pharmacy" form and adding a new Pharmacy "Johnson Pharmacy": ![Add](https://media.discordapp.net/attachments/833505136290299935/993972712802369556/unknown.png?width=770&height=670)

Screenshot of Pharmacy page after deleting " Albertsons" pharmacy:
![Delete](https://media.discordapp.net/attachments/833505136290299935/993973355545890867/unknown.png?width=796&height=670)

Screenshot of Pharmacy Update Page after clicking on "Update" for pharmacy "Wallgreens&":
![Update](https://media.discordapp.net/attachments/833505136290299935/993973421958504469/unknown.png)

Screenshot of Pharmacy page after I updated "Wallgreens&" pharmacy to have the name "Wallgreens" instead:
![Update2](https://media.discordapp.net/attachments/833505136290299935/993973534525239436/unknown.png?width=749&height=670)

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
