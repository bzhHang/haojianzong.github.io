---
layout: post
title:  "How to Implement In-App Language Switch on an iOS App"
date:   2015-05-16 16:20:00
categories: iOS
---

Apple provides an official way to implement in-app language switch on an
iOS App. Usually we would use the NSLocalizedString macro to localize our
apps. But it would require the user to leave the app and change language in the system setting, therefore it is impossible to change language in run-time.

![change language in
system-setting]({{site.url}}/images/ios-change-language.png)

Fortunately, there already are a lot of useful information out there in the community. After a little research, I setup the following tools to implement in-app language switch.

### Set Localized String Programatically

We will no longer use the NSLocalizedString() macro to set localized strings anymore.
Instead, we will have to write a utility class to load different language
strings from their own language bundle files. 

This
[article](http://createdineden.com/blog/2014/december/12/language-changer-in-app-language-selection-in-ios/) describes how to setup the environment and the utility class. The author also include an example project, please take a look. 

In short, the key is to load the string in a NSBundle by using the following
codes:

  // Get the relevant language bundle.
  NSString *bundlePath = [[NSBundle mainBundle]
  pathForResource:languageCode ofType:@"lproj"];
  NSBundle *languageBundle = [NSBundle bundleWithPath:bundlePath];
              
  // Get the translated string using the language bundle.
  NSString *translatedString = [languageBundle
  localizedStringForKey:key value:@"" table:nil];

## Set localized String in Xib files

Sadly we can not use the standard way to localize storyboard and xib files as
well. Instead of creating outlets for every view we want to localize, we can
take advantage of the *User Defined Runtime Attributes*.

First, create a category for UILabel, UIButton, UITextField and 
UITextView to define the `localizedString` runtime attribute. Here is the [gist](link-to-gist).

Now we can set the `localizedString` attribute in storyboard or xib views by
adding an entry of *User Defined Runtime Attributes*

[image-of-setting-user-define-attribute]

## Notify ViewControllers to Update

Chances are that you are using UITabBarController like I do. You can follow
these two steps to update your view controllers in sync.

First, after user change language, use a NSNotificationCenter notification to  controllers views.

Second, you will have to update UITabBarController items' text seprerately. Use the code described in this
stackoverflow
[answer](http://stackoverflow.com/questions/26683260/reload-tabbarcontroller-after-switching-language).

## Migrating from Non-in-App to In-App Language Switch

At the time when I am adding the in-app language switch funtionality to our app,
there are already hundreds of NSLocalizedString() codes in the project. It
would take lot to works to subsititute all of them. Luckly, I make use
of the following regex expression in xcode to replace all NSLocalizedString()
codes:

regex code.

[image-of-regex-replace]

That's it. Using the above tools, I am able to provide full support of in-app
language switch.

## Additional Information:
1.
[How to force NSLocalizedString to use a specific language] (http://stackoverflow.com/questions/1669645/how-to-force-nslocalizedstring-to-use-a-specific-language/1746920#1746920);