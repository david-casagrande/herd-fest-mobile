/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"HerdFest"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [self registerForRemoteNotifications];

  return YES;
}

// Handle remote notification registration.
- (void)application:(UIApplication *)app didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)devToken {
  [self saveDevToken:devToken];
}

- (void)application:(UIApplication *)app didFailToRegisterForRemoteNotificationsWithError:(NSError *)err {
  NSLog(@"Error in registration. Error: %@", err);
}

- (void) registerForRemoteNotifications {
  // Register the supported interaction types.
  UIUserNotificationType types = UIUserNotificationTypeBadge | UIUserNotificationTypeSound | UIUserNotificationTypeAlert;
  UIUserNotificationSettings *mySettings = [UIUserNotificationSettings settingsForTypes:types categories:nil];
  [[UIApplication sharedApplication] registerUserNotificationSettings:mySettings];
  
  // Register for remote notifications.
  [[UIApplication sharedApplication] registerForRemoteNotifications];
}

- (void) saveDevToken:(NSData *)devToken {
  NSString *uuid = [[[UIDevice currentDevice] identifierForVendor] UUIDString];
  NSString *apiURL = [[[NSProcessInfo processInfo] environment] objectForKey:@"API_URL"];
  NSURL *url = [NSURL URLWithString: apiURL ? apiURL : @"https://herd-fest-api.herokuapp.com/api/devices"];
  
  NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
  config.HTTPAdditionalHeaders = @{ @"Content-Type"  : @"application/json" };
  NSURLSession *session = [NSURLSession sessionWithConfiguration:config];
  
  NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:url];
  request.HTTPMethod = @"POST";
  
  NSDictionary *dictionary = @{ @"device_id": uuid, @"device_token": [self stringWithDeviceToken:devToken] };
  
  NSError *error = nil;
  NSData *data = [NSJSONSerialization dataWithJSONObject:dictionary options:kNilOptions error:&error];
  
  if (!error) {
    NSURLSessionUploadTask *uploadTask = [session uploadTaskWithRequest:request
                                                               fromData:data completionHandler:^(NSData *data,NSURLResponse *response,NSError *error) {
                                                                 NSLog(@"%@", error);
                                                               }];
    
    [uploadTask resume];
  }
}

- (NSString *) stringWithDeviceToken:(NSData *)deviceToken {
  const char *data = [deviceToken bytes];
  NSMutableString *token = [NSMutableString string];
  
  for (NSUInteger i = 0; i < [deviceToken length]; i++) {
    [token appendFormat:@"%02.2hhX", data[i]];
  }
  
  return [token copy];
}


@end
