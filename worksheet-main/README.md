# testing
# Employee Work Sheet Application

WorkSheet revolves around your log time entries.

You track time you spend working on things and then analyze it in reports.

Simply enter you log details what you worked on, choose start and/or duration, and add the time entry.

Time entries are more useful once you categorize them.
## Application Flow Diagram:

Work Sheet application main menu's and it's functionalities.

![Application flow](https://github.com/baraneetharan/worksheet/blob/main/wsflow1.png?raw=true)

![Application flow](https://github.com/baraneetharan/worksheet/blob/main/wsflow2.png?raw=true)

## UML Diagram

## Database Structure

```
CREATE TABLE `user` (
	`id` BIGINT(19) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`password` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`role` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`id`);

```
```
CREATE TABLE `all_task` (
	`id` BIGINT(19) NOT NULL AUTO_INCREMENT,
	`assignedate` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`assigneto` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`description` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`duedate` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`status` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`taskname` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`id`);

```
```
CREATE TABLE `work_log` (
	`id` BIGINT(19) NOT NULL AUTO_INCREMENT,
	`date` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`empname` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`etime` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`status` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`stime` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`taskname` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`id`);

```

![DBStructure](https://github.com/baraneetharan/worksheet/blob/52210a600e6df8ea716025d0ca81f08c3235b312/wsDB.JPG?raw=true)
## Web Interface

![Users](https://github.com/baraneetharan/worksheet/blob/main/manageuser.JPG?raw=true)

![Task](https://github.com/baraneetharan/worksheet/blob/main/ManageTask.JPG?raw=true)

![Log](https://github.com/baraneetharan/worksheet/blob/main/managelog.JPG?raw=true)

![Admin work flow](https://github.com/baraneetharan/worksheet/blob/main/worksheetAdminflow.png?raw=true)

![User work flow](https://github.com/baraneetharan/worksheet/blob/main/worksheetUserflow.png?raw=true)

## Test Plan
### Test Scenarios – Login Page

| SL.No.      | Test Case Description   |
| ------      | ---------------------   |
|1      	  | Verify the messages for each mandatory field.   |
|2      	  | Verify if the user cannot proceed without filling all the mandatory fields.   |
|3      	  | Verify if the numbers and special characters are allowed.   |
|4      	  | Verify if a user can log in with the valid details.   |
|5      	  | Verify if the Password and Confirm Password fields are accepting similar strings only.   |

### Test Cases – Login Page

Functional Test Cases:
| SL.No.      | Test Case Description   | Type          |
| ------      | ---------------------   | ------------- |
| 1.      | Verify if a user will be able to login with a valid username and valid password.       | Positive   |
| 2.      | Verify if a user cannot login with a valid username and an invalid password.           | Negative   |
| 3.      | Verify the login page for both, when the field is blank and Submit button is clicked   | Positive   |
| 4.      | Verify the messages for invalid login.                                                 | Positive   |
| 5.      | Verify if the data in password field is either visible as asterisk or bullet signs.    | Positive   |
| 6.      | Verify if the login page allows to log in simultaneously.                              | Positive   |
| 7.      | Verify if the ‘Enter’ key of the keyboard is working correctly on the login page.      | Positive   |
