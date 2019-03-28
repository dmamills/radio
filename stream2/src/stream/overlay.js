const FONT_PATH = `${process.cwd()}/assets/font/scp.ttf`;
const FONT_SIZE = '10'
const FONT_COLOR = '#FFFFFF';
const FONT_BORDER = "#000000";
const X_POSITION = 2;

//TODO: fix sanitize text
const sanitizeText = str => {
  var safeString = str;

  // Safen the string
  // \ will be \\
  safeString = safeString.replace(/\\/g, '\\\\');

  // : will be \:
  safeString = safeString.replace(/\:/g, '\\:');

  // ' will be \'
  safeString = safeString.replace(/\'/g, '\\\'');

  // Return safe string
return safeString;
}

const createOverlayText = (text, x, y) => {
    return `drawtext=text='${sanitizeText(text)}'` +
      `:fontfile=${FONT_PATH}` +
      `:fontsize=(w * ${(FONT_SIZE / 300).toFixed(2)})` +
      `:bordercolor=${FONT_BORDER}` +
      `:borderw=1` +
      `:fontcolor=${FONT_COLOR}` +
      `:y=(h * ${(y / 100).toFixed(2)})` +
      `:x=(w * ${(x / 100).toFixed(2)})`;
}

const addOverlay = metadata => {
  const { common } = metadata;
  let overlayString = '';
  const overlayTextItems = [];
  let yPosition = 5;

  overlayTextItems.push(createOverlayText('opensourceradio', X_POSITION, yPosition));
  yPosition += 8;

  if(common.artist) {
    overlayTextItems.push(createOverlayText(common.artist, X_POSITION, yPosition));
    yPosition += 8;
  }
  if(common.album) {
    overlayTextItems.push(createOverlayText(common.album, X_POSITION, yPosition));
    yPosition += 8;
  }
  
  if(common.title) {
    overlayTextItems.push(createOverlayText(common.title, X_POSITION, yPosition));
  }

  overlayTextItems.forEach((item, index) => {
   overlayString += `${item}`;
    if (index < overlayTextItems.length - 1) {
      overlayString += ',';
    }
  });

  return overlayString;
}

module.exports = addOverlay;