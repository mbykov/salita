//

var each;
try {
    var each = require('each-component');
} catch (err) {
    var each = require('each');
}

module.exports = salit();

function salit() {
    if (!(this instanceof salit)) return new salit();
}

salit.prototype.slp2sa = function(str) {
    str = str.replace('/', ''); // FIXME: - временно
    str = str.replace('-', ''); // FIXME: - ic-Cati
    var arr = str.split('');
    var sk = [];
    each(arr, function(letr, idx) {
        var prev = arr[idx-1];
        if (idx == 0 && letr in Vowels) sk[0] = Vowels[letr];
        if (prev in consonants) {
            if (letr in vowels) {
                sk[idx-1] = consonants[prev];
                sk[idx] = vowels[letr];
            } else if (letr in consonants) {
                sk[idx-1] = consonants[prev] + '्';
            }
        }
        if (idx == (arr.length-1) && letr in consonants) sk[idx] = consonants[letr] + '्';
        if (arr[idx] in signs) { sk[idx] = signs[letr] }
    });
    // log('SK', sk.join(''), sk);
    // log('ARR', arr.join(''), arr);
    return sk.join('');
}

salit.prototype.sa2slp = function(str) {
    var consonants_ = invert(consonants);
    var  vowels_ = invert(vowels);
    var  Vowels_ = invert(Vowels);
    var  signs_ = invert(signs);
    var arr = str.split('');
    var slp = [];
    each(arr, function(letr, idx) {
        var prev = arr[idx-1];
        if (idx == 0 && letr in Vowels_) slp[0] = Vowels_[letr];
        if (prev in consonants_) {
            if (letr in vowels_) {
                slp[idx-1] = consonants_[prev];
                slp[idx] = vowels_[letr];
            } else if (letr in consonants_ || letr in signs_) { // FIXME: why a difference?
                slp[idx-1] = consonants_[prev] + 'a';
            } else if (letr == '्') {
                slp[idx-1] = consonants_[prev];
            }
        }
        if (idx == (arr.length-1) && letr in consonants_) slp[idx] = consonants_[letr] + 'a';
        if (arr[idx] in signs_) { slp[idx] = signs_[letr] }
    });
    //log('ARR', arr.join(''), arr);
    //log('SLP', slp.join(''), slp);
    return slp.join('');
}

var signs = {
    "/": "́",
    "H": "ः",
    "M": "ं",
    "-": "-"
}

var Vowels = {
    "a": "अ",
    "A": "आ",
    "i": "इ",
    "I": "ई",
    "u": "उ",
    "U": "ऊ",
    "e": "ए",
    "E": "ऐ",
    "o": "ओ",
    "O": "औ",
    "f": "ऋ",
    "F": "ॠ",
    "x": "ऌ",
    "X": "ॡ"
};

var vowels = {
    "a": "",
    "A": "ा",
    "i": "ि",
    "I": "ी",
    "u": "ु",
    "U": "ू",
    "e": "े",
    "E": "ै",
    "o": "ो",
    "O": "ौ",
    "f": "ृ",
    "F": "ॄ",
    "x": "ॢ",
};

var consonants = {
    "k": "क", // == is for bolnagri
    "K": "ख",
    "g": "ग",
    "G": "घ",
    "c": "च",
    "C": "छ",
    "j": "ज",
    "J": "झ",
    "w": "ट", // टठ-tT == टठ-fF // cerebral
    "W": "ठ",
    "q": "ड", // डढ-dD == डढ-vV
    "Q": "ढ",
    "t": "त", // तथ-wW == तथ-tT
    "T": "थ",
    "d": "द", // दध-xX == दध-dD
    "D": "ध",
    "n": "न",
    "R": "ण", // == N
    "N": "ङ", // == M
    "p": "प",
    "P": "फ",
    "b": "ब",
    "B": "भ",
    "m": "म",
    "y": "य",
    "Y": "ञ",
    "r": "र",
    "l": "ल",
    "v": "व", // वॐ == wW
    "S": "श", // श ॅ == zZ
    "z": "ष",
    "s": "स",
    "h": "ह",
    "": "",
};

// Harvard-Kioto (based on)

var VowelsHK = {
    "a": "अ",
    "aa": "आ",
    "A": "आ",
    "i": "इ",
    "ii": "ई",
    "I": "ई",
    "u": "उ",
    "uu": "ऊ",
    "U": "ऊ",
    "e": "ए",
    "ai": "ऐ",
    "o": "ओ",
    "au": "औ",
    "R": "ऋ",
    "RR": "ॠ",
    "lR": "ऌ",
    "lRR": "ॡ"
}

var vowelsHK = {
    "a": "|", // '|' is for 'non virama' sign only
    "aa": "ा",
    "A": "ा",
    "i": "ि",
    "ii": "ी",
    "I": "ी",
    "u": "ु",
    "uu": "ू",
    "U": "ू",
    "e": "े",
    "ai": "ै",
    "o": "ो",
    "au": "ौ",
    "R": "ृ",
    "RR": "ॄ",
    "lRR": "ॢ",
}

var consonantsHK = {
    "k": "क",
    "kh": "ख",
    "g": "ग",
    "gh": "घ",
    "G": "ङ",
    "c": "च",
    "ch": "छ",
    "j": "ज",
    "jh": "झ",
    "J": "ञ",
    "T": "ट",
    "Th": "ठ",
    "D": "ड",
    "Dh": "ढ",
    "N": "ण",
    "t": "त",
    "th": "थ",
    "d": "द",
    "dh": "ध",
    "n": "न",
    "p": "प",
    "ph": "फ",
    "b": "ब",
    "bh": "भ",
    "m": "म",
    "y": "य",
    "r": "र",
    "l": "ल",
    "v": "व",
    "z": "श",
    "S": "ष",
    "s": "स",
    "h": "ह",
    "": "",
};

salit.prototype.hk2sa = function(str) {
    str = clean(str);
    var sa;

    for (var hk in signs) {
        sa = signs[hk];
        str = str.split(hk).join(sa);
    }
    for (var hk in consonantsHK) {
        if (hk.length == 1) continue;
        sa = consonantsHK[hk];
        str = str.split(hk).join(sa);
    }
    for (var hk in consonantsHK) {
        if (hk.length == 2) continue;
        sa = consonantsHK[hk];
        str = str.split(hk).join(sa);
    }
    for (var hk in VowelsHK) {
        if (hk.length == 1) continue;
        sa = VowelsHK[hk];
        var reHK = new RegExp('^' + hk);
        str = str.replace(reHK, sa);
    }
    for (var hk in VowelsHK) {
        if (hk.length == 2) continue;
        sa = VowelsHK[hk];
        var reHK = new RegExp('^' + hk);
        str = str.replace(reHK, sa);
    }
    for (var hk in vowelsHK) {
        if (hk.length == 1) continue;
        sa = vowelsHK[hk];
        str = str.split(hk).join(sa);
    }
    for (var hk in vowelsHK) {
        if (hk.length == 2) continue;
        sa = vowelsHK[hk];
        str = str.split(hk).join(sa);
    }
    var sk = [];
    var arr = str.split('');
    var prev;
    var iconsHK = invert(consonantsHK);
    each(arr, function(letr, idx) {
        prev = arr[idx-1];
        if (prev && (letr in iconsHK) && (prev in iconsHK)) {
            letr = Const.virama + letr;
        }
        sk.push(letr);
    });
    str = sk.join('');
    if (str.slice(-1) in iconsHK) str = [str, Const.virama].join('');
    str = str.split('|').join('');
    return str;
}

function clean(str) {
    str = str.trim();
    str = str.split('/').join('');
    str = str.split('-').join('');
    str = str.split('|').join('');
    return str;
}

var Const = {
    'virama': '्',
}


function log() { console.log.apply(console, arguments) }

function invert(obj) {
    var new_obj = {};
    for (var prop in obj) {
        if(obj.hasOwnProperty(prop)) {
            new_obj[obj[prop]] = prop;
        }
    }
    return new_obj;
};
