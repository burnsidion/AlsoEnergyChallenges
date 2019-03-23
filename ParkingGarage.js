class ParkingGarage {

  constructor() {

    // row = garage[level][row]
    // garage[0] // first level
    // garage[0][0] // first level, first row
    // assume no cars/motos park in a way that blocks a bus needing 5 larges
    this.garage =
    [
      [
        {
          'large': [null,null,null,null,null,null,null,null,null,null]
        },
        {
          'large': [null,null,null,null,null,null,null,null,null,null]
        }
      ],
      [
        {
          'moto': [null, null, null, null, null],
          'compact': [null, null, null, null, null]
        },
        {
          'moto': [null, null, null, null, null],
          'compact': [null, null, null, null, null]
        }
      ],
      [
        {
          'moto': [null, null],
          'compact': [null, null, null, null, null, null, null, null]
        },
        {
          'moto': [null, null],
          'compact': [null, null, null, null, null, null, null, null]
        }
      ]
    ]
  }

  // find first spot in the row thats taken by a specific vehicle type
  getSpotInRow(row, spotType, vehicleType=null) {
    if(row.hasOwnProperty(spotType)) {
      // find index of first open spot
      return row[spotType].indexOf(vehicleType)
    }
    return undefined
  }

  // requires either a motos, compact, or large spot
  addMoto() {

    //loop through levels (top to bottom)
    for(let i = this.garage.length-1; i >= 0; i--) {
      //loop through rows
      for(let j = 0; j < this.garage[i].length; j++) {

        //loop through moto spots (if exists)
        let s = this.getSpotInRow(this.garage[i][j], 'moto', null)
        if(s>=0) { this.garage[i][j].moto[s] = 'motorcycle'; return; }

        //loop through compact spots (if exists)
        s = this.getSpotInRow(this.garage[i][j], 'compact', null)
        if(s>=0) { this.garage[i][j].compact[s] = 'motorcycle'; return; }

        //loop through large spots (if exists)
        s = this.getSpotInRow(this.garage[i][j], 'large', null)
        if(s>=0) { this.garage[i][j].large[s] = 'motorcycle'; return; }

      }
    }
  }

  removeMoto() {
    //loop through levels (bottom to top)
    for(let i = 0; i < this.garage.length; i++) {
      //loop through rows
      for(let j = 0; j < this.garage[i].length; j++) {

        //loop through large spots (if exists)
        let s = this.getSpotInRow(this.garage[i][j], 'large', 'motorcycle')
        if(s>=0) { this.garage[i][j].large[s] = null; return; }

        //loop through compact spots (if exists)
        s = this.getSpotInRow(this.garage[i][j], 'compact', 'motorcycle')
        if(s>=0) { this.garage[i][j].compact[s] = null; return; }

        //loop through moto spots (if exists)
        s = this.getSpotInRow(this.garage[i][j], 'moto', 'motorcycle')
        if(s>=0) { this.garage[i][j].moto[s] = null; return; }

      }
    }
  }

  // requires either a compact or a large spot
  addCar() {
    // could be on any level, only need 1
    //loop through levels (top to bottom)
    for(let i = this.garage.length-1; i >= 0; i--){
      //loop through rows
      for(let j = 0; j < this.garage[i].length; j++){

        //loop through compact spots (if exists)
        let s = this.getSpotInRow(this.garage[i][j], 'compact', null)
        if(s>=0) { this.garage[i][j].compact[s] = 'car'; return; }

        //loop through large spots (if exists)
        s = this.getSpotInRow(this.garage[i][j], 'large', null)
        if(s>=0) { this.garage[i][j].large[s] = 'car'; return; }
      }
    }
  }

  removeCar() {
    //loop through levels (bottom to top)
    for(let i = 0; i < this.garage.length; i++){
      //loop through rows
      for(let j = 0; j < this.garage[i].length; j++){

        //loop through compact spots (if exists)
        let s = this.getSpotInRow(this.garage[i][j], 'compact', 'car')
        if(s>=0) { this.garage[i][j].compact[s] = null; return; }

        //loop through large spots (if exists)
        s = this.getSpotInRow(this.garage[i][j], 'large', 'car')
        if(s>=0) { this.garage[i][j].large[s] = null; return; }
      }
    }
  }

  addBus() {
    //loop through first level only
    for(let i = 0; i < this.garage[0].length; i++){
      //loop through rows
      for(let j = 0; j < this.garage[i].length; j++){

        //loop through large spots (if exists)
        let s = this.getSpotInRow(this.garage[i][j], 'large', null)
        let busSpots = this.garage[i][j].large;
        //location of first available bus spot
        let firstOpen = busSpots.indexOf(null);
        console.log(busSpots)
        //replace 5 empty (null) spots with 5 of the 'same bus' representing 1 bus.
        if(s>=0) {
          busSpots.splice(firstOpen,5,'same bus','same bus','same bus','same bus','same bus');
          return;
        } else return "No Open Spots";
      }
    }
  }

  removeBus() {

    //loop through levels (bottom to top)
    for(let i = 0; i < this.garage.length; i++){

      //loop through rows
      for(let j = 0; j < this.garage[i].length; j++){

        let s = this.getSpotInRow(this.garage[i][j], 'large', 'same bus')
        let busSpots = this.garage[i][j].large;
        //remove the 'same bus' from its designated 5 places and replace them will empty (null) spaces
        if(s>=0){
          let firstBus = busSpots.indexOf('same bus')
          busSpots.splice(firstBus,5,null,null,null,null,null);
          return;
        }
      }
    }
  }
}


//Use to test each method in node------------

// myPG = new ParkingGarage()
// console.log('PRE myGarage', JSON.stringify(myPG.garage));
//
// myPG.addMoto()
// console.log('addMoto myGarage', JSON.stringify(myPG.garage));
//
// myPG.removeMoto()
// console.log('removeMoto myGarage', JSON.stringify(myPG.garage));
//
// myPG.addCar()
// console.log('addCar myGarage', JSON.stringify(myPG.garage));
//
// myPG.removeCar()
// console.log('removeCar myGarage', JSON.stringify(myPG.garage));
//
// myPG.addBus()
// console.log('addBus myGarage', JSON.stringify(myPG.garage))
//
// myPG.removeBus()
// console.log('removeBus myGarage', JSON.stringify(myPG.garage))
