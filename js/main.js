/*jslint devel: true, indent: 2 */

(function () {

  'use strict';

  function Mammal(name) {

    // -----------------------------------------------------------------------
    // Private variables and functions
    // Only priveleged methods may view/edit/invoke
    // -----------------------------------------------------------------------

    var age = 1;

    // ----------------------------------------------------------------------- 
    // Privileged methods 
    // May be invoked publicly and may access private items 
    // May not be changed; May be replaced with public flavors
    // ----------------------------------------------------------------------- 

    this.toString = this.getName = function () {
      return name || "";
    };

    this.getAge = function () {
      return age;
    };

    // ----------------------------------------------------------------------- 
    // Public properties - Anyone may read/write
    // -----------------------------------------------------------------------

    this.mood = "hungry";

  }

  // -----------------------------------------------------------------------  
  // Prototype properties - Anyone may read/write (but may be overridden)
  // -----------------------------------------------------------------------

  Mammal.prototype.legs = 2;

  // -----------------------------------------------------------------------  
  // Prototype methods - Any subclass may read/write
  // -----------------------------------------------------------------------

  Mammal.prototype.eat = function () {
    this.mood = "happy";
  };

  // -----------------------------------------------------------------------  
  // Static properties - Anyone may read/write
  // -----------------------------------------------------------------------

  Mammal.population = 0;

  // -----------------------------------------------------------------------
  // You cause a class to inherit using ChildClassName.prototype = new ParentClass();
  // You need to remember to reset the constructor property for the class using ChildClassName.prototype.constructor=ChildClassName
  // You can call ancestor class methods which your child class has overridden using the Function.call() method
  // Javascript does not support protected methods
  // -----------------------------------------------------------------------

  function Cat(name) {
    Mammal.call(this, name);
  }

  // -----------------------------------------------------------------------
  // 1. Calling extend method
  // -----------------------------------------------------------------------
  /*
  Function.prototype.extend = function (parent) {
    if (parent.constructor == Function) {
      // Normal inheritance
      this.prototype = new parent;
      this.prototype.constructor = this;
      this.prototype.parent = parent.prototype;
    } else {
      // Pure virtual inheritance
      this.prototype = parent;
      this.prototype.constructor = this;
      this.prototype.parent = parent;
    }
  }

  Cat.extend(Mammal);
  */

  // -----------------------------------------------------------------------
  // 2. Custom extend method
  // -----------------------------------------------------------------------
  /*
  Function.prototype.inheritFrom = function (parent) {
    var o = {}
    o.__proto__ = parent.prototype;
    this.prototype = o;
    this.prototype.constructor = this;
  }

  Cat.inheritFrom(Mammal);
  */

  // -----------------------------------------------------------------------
  // 3. Using Object.create method
  // -----------------------------------------------------------------------
  
  Cat.prototype = Object.create(Mammal.prototype);
  Cat.prototype.constructor = Cat;

  // -----------------------------------------------------------------------
  // Create instance
  // -----------------------------------------------------------------------

  var kitten = new Cat("kitten");

  console.dir(kitten);
  console.log(kitten.getName());
  console.log(kitten.legs);

}());