let assetMetadataHash = new Uint8Array(btoa("Kaoutar").split("").map(c => c.charCodeAt(0)));
console.log("🚀 ~ file: ttt.js ~ line 2 ~ assetMetadataHash", assetMetadataHash)

console.log(atob(String.fromCharCode.apply(null, assetMetadataHash)));


const toUint8Array = (base64) => {
    const raw = atob(base64);
    const uint8Array = new Uint8Array(new ArrayBuffer(raw.length));
    for (let i = 0; i < raw.length; i++) {
        uint8Array[i] = raw.charCodeAt(i);
    }
    return uint8Array;
}

const stringToUint8Array = (string) => {
    const uint8Array = new Uint8Array(new ArrayBuffer(string.length));
    for (let i = 0; i < string.length; i++) {
        uint8Array[i] = string.charCodeAt(i);
    }
    return uint8Array;
}

const uint8ArrayToString = (uint8Array) => {
    const encodedString = String.fromCharCode.apply(null, uint8Array);
    const decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
}

console.log(stringToUint8Array("Kaoutar"));
console.log(uint8ArrayToString(stringToUint8Array("Kaoutar")));

const cipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);

    return text => text.split('')
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join('');
}
    
const decipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
    return encoded => encoded.match(/.{1,2}/g)
      .map(hex => parseInt(hex, 16))
      .map(applySaltToChar)
      .map(charCode => String.fromCharCode(charCode))
      .join('');
}

const str = "Kaoutar111";

cif = cipher("salt")(str);
console.log(cif);
console.log(decipher("salt")(cif));