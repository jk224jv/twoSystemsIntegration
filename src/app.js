/**
 * Program that converts data provided in source.txt
 * into xml code saved in output.xml.
 *
 * @see readme.md for given example.
 * @author Jimmy Karlsson <jk224jv@student.lnu.se>
 * @version 1.0.0
 */

import 'events'
import * as fs from 'fs'
import lineReader from 'line-reader'
import { Person, FamilyMember, Address, Telephone } from './Classes.js'

let currentPerson = new Person()
let familymember = new FamilyMember()

/**
 * Starting point of the program.
 */
function main () {
  sourceFileToObjects('source.txt')
  process.exitCode = 0
}

/**
 * Read the sourcefile and call to process.
 *
 * @param {string} file - pathway to sourcefil.
 */
function sourceFileToObjects (file) {
  const people = []
  lineReader.eachLine(file, function (sourceLine, last) {
    const sourceLineType = sourceLine.charAt(0)

    switch (sourceLineType) {
      case 'P':
      // If it's not the first person save the last one.
        if (currentPerson.firstName) {
        // if there is a familymember. save it first.
          if (familymember.name !== undefined) {
            currentPerson.familymembers.push(familymember)
          }
          people.push(currentPerson)
          familymember = new FamilyMember()
        }
        individual(sourceLine)
        break
      case 'T':
        telephone(sourceLine)
        break
      case 'A':
        address(sourceLine)
        break
      case 'F':
        family(sourceLine)
        break
    }
    if (last) {
      // if there is a familymember. save it first.
      if (familymember.name !== undefined) {
        currentPerson.familymembers.push(familymember)
      }
      people.push(currentPerson)
      console.log('Filen konverterad.')
      arrayToXMLString(people)
    }
  })
}

/**
 * Converts a dataline from system A with nameinformation.
 *
 * @param {string} sourceLine - 'P|förnamn|efternamn'
 */
function individual (sourceLine) {
  currentPerson = new Person(sourceLine.slice(2, sourceLine.indexOf('|', 3)), sourceLine.slice(sourceLine.indexOf('|', 3) + 1, sourceLine.length))
}

/**
 * Converts a dataline from system A with telephoneinformation.
 *
 * @param {string} sourceLine - 'T|mobilnummer|fastnätsnummer'
 */
function telephone (sourceLine) {
  // is this part of a familymembers information or else a person?
  if (familymember.name !== undefined) {
    familymember.phone = new Telephone(sourceLine.slice(2, sourceLine.indexOf('|', 3)), sourceLine.slice(sourceLine.indexOf('|', 3) + 1, sourceLine.length))
  } else {
    currentPerson.phone = new Telephone(sourceLine.slice(2, sourceLine.indexOf('|', 3)), sourceLine.slice(sourceLine.indexOf('|', 3) + 1, sourceLine.length))
  }
}

/**
 * Converts a dataline from system A with addressinformation.
 *
 * @param {string} sourceLine - 'A|gata|stad|postnummer'
 */
function address (sourceLine) {
  const street = sourceLine.slice(2, sourceLine.indexOf('|', 3))
  let city
  let postalcode

  // if there is a postalcode?
  if (sourceLine.indexOf('|', 3) !== sourceLine.lastIndexOf('|')) {
    city = sourceLine.slice(sourceLine.indexOf('|', 3) + 1, sourceLine.lastIndexOf('|'))
    postalcode = sourceLine.slice(sourceLine.lastIndexOf('|') + 1, sourceLine.length)
  } else {
    city = sourceLine.slice(sourceLine.lastIndexOf('|') + 1, sourceLine.length)
    postalcode = undefined
  }
  // is this part of a familymembers information or else a person?
  if (familymember !== undefined) {
    familymember.address = new Address(street, postalcode, city)
  } else {
    currentPerson.address = new Address(street, postalcode, city)
  }
}

/**
 * Converts a dataline from system A to with familymembers information.
 *
 * @param {string} sourceLine - 'F|namn|födelseår'
 */
function family (sourceLine) {
  // if not the first, save the current.
  if (familymember.name !== undefined) {
    currentPerson.familymembers.push(familymember)
  }
  familymember = new FamilyMember(sourceLine.slice(2, sourceLine.indexOf('|', 3)), sourceLine.slice(sourceLine.indexOf('|', 3) + 1, sourceLine.length))
}

/**
 * Converts into a XML string representing the array of persons.
 *
 * @param {object[]} array - an array of Person-objects.
 */
function arrayToXMLString (array) {
  let indent = 2
  let XMLString = '<people>\n'
  XMLString += convertPeopleArray(array, indent, 'person')
  indent = 2
  XMLString += '</people>\n'
  printToFile(XMLString)
}

/**
 * Convert array of people/familymember objects into xml code.
 *
 * @param {object[]} array of People of FamilyMember objects.
 * @param {number} indent - how far does the line indent?
 * @param {string} type - is it people or familymember objects?
 * @returns {string} xml code.
 */
function convertPeopleArray (array, indent, type) {
  let xmlString = ''
  for (let personNr = 0; personNr < array.length; personNr++) {
    xmlString += ''.padEnd(indent, ' ') + `<${type}>\n`
    indent = indent + 2
    for (const dataType in array[personNr]) {
      if (Object.hasOwnProperty.call(array[personNr], dataType)) {
        const data = array[personNr][dataType]
        if (data) {
          switch (dataType) {
            case 'familymembers':
              xmlString += convertPeopleArray(data, indent, 'family')
              break
            case 'address':
              xmlString += dealWithSubSet(data, indent, 'address')
              break
            case 'phone':
              xmlString += dealWithSubSet(data, indent, 'phone')
              break
            default:
              xmlString += ''.padEnd(indent, ' ') + `<${dataType}>${data}</${dataType}>\n`
              break
          }
        }
      }
    }
    indent = indent - 2
    xmlString += ''.padEnd(indent, ' ') + `</${type}>\n`
  }
  return xmlString
}

/**
 * Convert an objects into xml code.
 *
 * @param {object} object - ether a Address or Telephone object.
 * @param {number} indent - how far does the line indent?
 * @param {string} type - what is the parant xml type?
 * @returns {string} xml code.
 */
function dealWithSubSet (object, indent, type) {
  let objectHaveData = false
  let xmlString = ''.padEnd(indent, ' ') + `<${type}>\n`
  indent = indent + 2
  for (const dataType in object) {
    if (Object.hasOwnProperty.call(object, dataType)) {
      const data = object[dataType]
      if (data) {
        objectHaveData = true
        xmlString += ''.padEnd(indent, ' ') + `<${dataType}>${data}</${dataType}>\n`
      }
    }
  }
  indent = indent - 2
  xmlString += ''.padEnd(indent, ' ') + `</${type}>\n`
  if (objectHaveData === false) {
    xmlString = ''
  }
  return xmlString
}

/**
 * Write xml file.
 *
 * @param {string} xmlCode - xml code.
 */
function printToFile (xmlCode) {
  fs.appendFile('output.xml', xmlCode, (err) => {
    if (err) throw err
  })
  console.log('Filen sparad.')
}

main()
