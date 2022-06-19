# Vehicle Parking

Built with node version 12


## Steps to setup and execute

* Step 1: Install Dependencies

```
npm install
```

* Step 2: Save input commands in the file: 'input.txt' in base directory

* Step 3: Run npm start

```
npm start
```


## I/O

```
Input Source: input.txt
Output Source: Terminal
```


## Input Example

```
Create_parking_lot 6
Park KA-01-HH-1234 driver_age 21
Park PB-01-HH-1234 driver_age 21
Slot_numbers_for_driver_of_age 21
Park PB-01-TG-2341 driver_age 40
Slot_number_for_car_with_number PB-01-HH-1234
Leave 2
Park HR-29-TG-3098 driver_age 21
Vehicle_registration_number_for_driver_of_age 21
```


## Output

```
Created parking of 6 slots
Car with vehicle registration number "KA-01-HH-1234" has been parked at slot number 1
Car with vehicle registration number "PB-01-HH-1234" has been parked at slot number 2
1,2
Car with vehicle registration number "PB-01-TG-2341" has been parked at slot number 3
2
Slot number 2 vacated, the car with vehicle registration number "PB-01-HH-1234" left the space, the driver of the car was of age 21
Car with vehicle registration number "HR-29-TG-3098" has been parked at slot number 2
KA-01-HH-1234,HR-29-TG-3098
```

