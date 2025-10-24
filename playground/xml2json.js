import * as convert from 'xml-js';
import * as fs from 'fs';

const xml = fs.readFileSync('./playground/ecm-wim.xml', 'utf8');

var json = convert.xml2json(xml, { compact: true, spaces: 4 });
console.log("to json -> %s", json);