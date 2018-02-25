[![Build Status](https://travis-ci.org/caciviclab/disclosure-frontend.svg)](https://travis-ci.org/caciviclab/disclosure-frontend)

**This project is deprecated and no longer maintained. We are consolidating
efforts into a static generated website approach using
[disclosure-backend-static](https://github.com/caciviclab/disclosure-backend-static)
and [odca-jekyll](https://github.com/caciviclab/odca-jekyll).**


# Open Disclosure California

This is the front-end AngularJS application for viewing ballot measure funding data. This front-end application works from an API defined by the [back-end Django application](https://github.com/caciviclab/disclosure-backend)


## Contributing

### Tests

Don't forget to run the tests.

    $ npm test


### Where does the data come from?

The data comes from the [disclosure API][disclosure-api]. The
API is incomplete, but the
[repo][disclosure-backend] has useful information
about what the models are shaping up like, even for incomplete APIs. [Ballot models](https://github.com/caciviclab/disclosure-backend/blob/master/ballot/models.py)
are separate from [finance data](https://github.com/caciviclab/disclosure-backend/blob/master/netfile/models.py),
since that's how the data is ingested, but eventually should be combined for the
frontend views.


#### Links

Url                                      | Description
---                                      | -----------
[disclosure-backend][disclosure-backend] | Disclosure API repo.
[Disclosure API][disclosure-api]         | Documentation for the disclosure API.
[Disclosure Admin][disclosure-admin]     | Admin interface for entering ballot data.

[disclosure-backend]: https://github.com/caciviclab/disclosure-backend
[disclosure-api]: http://admin.caciviclab.org/docs/
[disclosure-admin]: http://admin.caciviclab.org/admin/

#### Testing against a development backend

If you want to test against a development backend, you can set these environment
variables

    $ DISCLOSURE_STATIC_BACKEND='http://localhost:4567' DISCLOSURE_SWAGGER_SPEC='http://localhost:8000/docs/api-docs/' npm start

And the tests

    $ DISCLOSURE_STATIC_BACKEND='http://localhost:4567' DISCLOSURE_SWAGGER_SPEC='http://localhost:8000/docs/api-docs/' npm start


##### Legacy python back-end

To point this front-end to another (e.g. local test) back-end:
* Run `python manage.py runserver` from your back-end repo; this should start your back-end server on port 8000.
* Edit `app/app-init.js`, set `$rootScope.swaggerSpec = 'http://127.0.0.1:8000/docs/api-docs/';`.


### Setup Instructions

1. Install the LTS version of [node.js](https://nodejs.org/en/)
1. Clone the repository.
1. Run: ```npm install``` from inside the repository directory, to install all project dependencies.
1. Run ```npm start```
1. Open [localhost:5000](http://localhost:5000) in your browser


### Contributing
This project is open source so collaboration is welcome.

A brief guide:
* If you see a way to improve something in this project, please feel free to open a Pull Request to the *develop* branch so we can discuss your code.
* Review our [docs for contributing](Contributing.md) to learn more about the application structure, coding style, etc.
* Run `npm test` before submitting a pull request.


### Learning Resouces
- https://github.com/curran/screencasts/tree/gh-pages/introToAngular
- https://www.codeschool.com/courses/shaping-up-with-angular-js
- http://egghead.io
- http://thinkster.io


## Deployment

Travis will deploy the `master` branch to Github Pages. You shouldn't need to manually deploy
but, here are the instructions.

To deploy, just set a personal access token via GITHUB_TOKEN in your environment
and run the deploy script. The script will build your working directory as is,
and push it to Github pages.

    $ GITHUB_TOKEN=<your personal token> ./deploy.sh
