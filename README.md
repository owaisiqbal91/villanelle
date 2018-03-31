# Villanelle
Story authoring tool

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

You will need to install nodejs and npm on your machine first

```
apt-get install nodejs
apt-get install npm
```

After cloning the project, you will need to install all the module dependencies via npm. Navigate to the project folder (make sure you're in it, there should be a package.json file) and run the command:

```
npm install
```

This will install typescript, gulp and other dependencies. You will see a node_modules folder appear in the directory.

Install gulp-cli globally in order to run gulp from the command line:

```
npm install -g gulp-cli
```

Run gulp:
```
gulp
```

This will recompile the files in the src directory and republish them in the dist folder. You can run the index.html in the dist folder. If you make any changes to scripting.ts or isolation.ts, you dont have to recompile (as long as you have the gulp process open), just refresh index.html.
gulp is used to streamline our build process which is specified in gulpfile.js. We use browserify to bundle all the files together (and it is this bundle.js which is used in index.html) and we use watchify to monitor for changes in the source files to compile them again.

### Running typescript individually on files

If you want to run typescript individually on files in order to check the exact compiler errors, you would first have to install typescript globally:

```
npm-install -g typescript
```

You can then enter the source folder and run the tsc command on any typescript file:

```
tsc scripting.ts
```
