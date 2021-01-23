class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  };

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let distance = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      distance++;
    }
    return distance;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal > vampire.numberOfVampiresFromOriginal) {
      return false;
    } else {
      return true;
    }
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
   let vamp1 = this;
   let vamp2 = vampire; 
// the distance from og is not the same, run the function until they are the same distance from the og. At that point, if they are the same person, we know thats the ancestor. If they are not the same person, then we can creep up the ladder until we find one. 
const getclose = function(user1, user2){
  if (user1.numberOfVampiresFromOriginal > user2.numberOfVampiresFromOriginal){
    user1 = user1.creator; 
    getclose(user1, user2);
  } else if (user2.numberOfVampiresFromOriginal > user1.numberOfVampiresFromOriginal){
    user2 = user2.creator;
    getclose(user1, user2);
  } else {
    vamp1 = user1;
    vamp2 = user2; 
  }
  };
  getclose(vamp1, vamp2);

  const anscestor = function(user1, user2) {
    if (vamp1 === vamp2){
      return vamp1; 
    } else if (vamp1.creator === vamp2.creator){
      return vamp1.creator;
    } else if (!vamp1.creator || !vamp2.creator){
      if (!vamp1.creator){
        return vamp1;
      } else {
        return vamp2;
      }
    } else {
      vamp1 = vamp1.creator; 
      vamp2 = vamp1.creator;
      return anscestor(vamp1, vamp2);
    }
  };
 return anscestor(vamp1, vamp2)
}
};
 
module.exports = Vampire; 