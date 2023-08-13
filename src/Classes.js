/**
 * Classes for storing contact information during file converserion.
 *
 * @author Jimmy Karlsson <jk224jv@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Stores data about persons.
 *
 * @param {string} firstName - the individuals first name.
 * @param {string} lastname - the individuals sir name.
 * @param {Telephone} telephone - Telephone object.
 * @param {Address} address - Address object.
 * @param {FamilyMember[]} familymembers - array of FamilyMember(s) linked to Person.
 */
export class Person {
  /**
   * Initiates a new blank person.
   *
   * @param {string} firstName - the individuals first name.
   * @param {string} lastName - the individuals sir name.
   */
  constructor (firstName, lastName) {
    this.firstName = firstName
    this.lastname = lastName
    this.phone = undefined
    this.address = undefined
    this.familymembers = []
  }
}

/**
 * Stores data about FamilyMembers.
 *
 * @param {string} name - firstname.
 * @param {string} birthyear - year of birth.
 * @param {Telephone} telephone - Telephone object.
 * @param {Address} address - Address object.
 */
export class FamilyMember {
/**
 * Initiates a new blank familyMember.
 *
 * @param {string} birthName - firstname.
 * @param {string} birthYear - year of birth.
 */
  constructor (birthName = undefined, birthYear = undefined) {
    this.name = birthName
    this.born = birthYear
    this.phone = undefined
    this.address = undefined
  }
}

/**
 * Stores data about Telephone contact information.
 *
 * @param {string} mobile - cellphone number.
 * @param {string} landline - landline number.
 */
export class Telephone {
  /**
   * Initiates a new blank Telephone.
   *
   * @param {string} mobileNumberString - cellphone number.
   * @param {string} landlineNumberString - landline number.
   */
  constructor (mobileNumberString, landlineNumberString) {
    this.mobile = mobileNumberString
    this.landline = landlineNumberString
  }
}

/**
 * Stores data about Postal contact information.
 *
 * @param {string} street - streetadress and house nr.
 * @param {string} areacode - postal code.
 * @param {string} city - name of the city where the individual lives.
 */
export class Address {
  /**
   * Initiates a new blank Address.
   *
   * @param {string} streetName - streetadress and house nr.
   * @param {string} areacode - postal code.
   * @param {string} cityName - name of the city where the individual lives.
   */
  constructor (streetName, areacode = undefined, cityName) {
    this.street = streetName
    this.postalcode = areacode
    this.city = cityName
  }
}
