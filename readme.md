> [!WARNING]  
> This bookmarklet will not work with the newer variable window introduced in 2023 versions of Qlik Sense.

# qsvd
Qlik Sense Variable Destroy (Bookmarklet to delete Qlik Sense variables).

Either create a bookmark yourself below, or go to https://withdave.github.io/qsvd/ and drag the button to your bookmarks bar.

If you're looking for something more powerful, that runs on the Qlik Sense server and has the ability to selectively remove variables, have a look at https://github.com/BaptisteDurand/QlikSense-VariablesDestructor.


## Purpose
This bookmarklet is designed to be saved into a bookmark on your browser bar, and is a quick way of deleting all user variables in a Qlik Sense app.

All code is run client side, so no configuration or uploads to the Qlik Sense environment are required.

![GIF Demonstrating use of bookmarklet](qsvd_demo.gif)*Demo of bookmarklet in a Qlik Sense app with over 1000 variables*



## Use
1. Create a bookmark and paste the following into the address section:
```
javascript:(function()%7Bfunction callback()%7Bconsole.log("For updates see https%3A%2F%2Fgithub.com%2Fwithdave%2Fqlik-sense-variable-destroy")%7Dvar s%3Ddocument.createElement("script")%3Bs.src%3D"https%3A%2F%2Fwithdave.github.io%2Fqsvd%2Fqsvd.min.js"%3Bif(s.addEventListener)%7Bs.addEventListener("load"%2Ccallback%2Cfalse)%7Delse if(s.readyState)%7Bs.onreadystatechange%3Dcallback%7Ddocument.body.appendChild(s)%3B%7D)()
```

2. Navigate to a Qlik Sense sheet and enter edit mode.
3. Click on the variables menu to bring up the list of user-facing variables. 
4. Click the bookmarklet in your browser, and confirm you wish to proceed.
5. qsvd will destroy your variables, and print them out to the console just in case you made a mistake.


## Tested configurations
Qlik Sense
* September 2018
* February 2019
* June 2019
* September 2019

Browsers
* Chrome 63


## Known issues
* You will not be able to delete variables from published apps (unless you've been modifying security rules)
* Both script and user created variables will be deleted, but these will only be for those visible in the front end (i.e. not environmental variables)
* Does not work in IE or Edge

## Notes
* The bookmarklet was generated using an online tool: https://mrcoles.com/bookmarklet/

## License
[MIT](https://choosealicense.com/licenses/mit/)
