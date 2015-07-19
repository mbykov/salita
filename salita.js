//

var each;
try {
    var each = require('each-component');
} catch (err) {
    var each = require('each');
}

var c = require('./lib/constants');

module.exports = salita();

function salita() {
    if (!(this instanceof salita)) return new salita();
}

salita.prototype.slp2sa = function(str) {
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
    return sk.join('');
}

salita.prototype.sa2slp = function(str) {
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
    return slp.join('');
}

salita.prototype.sa2iast = function(str) {
    // неоднозначные - с придыханием, сначала их, потом все подряд
    // если гласная-лига, то - если a - одно, иначе - другое
    str = clean(str);
    var cons = invert(c.consIAST);
    var  ligas = invert(c.ligaIAST);
    var  vowels = invert(c.vowelIAST);
    // var  signs = invert(signs);
    var arr = str.split('');
    var iast = [];
    log('==>', arr)
    arr.forEach(function(sym, idx) {
        var prev = arr[idx-1];
        var next = arr[idx+1];
        // log('SYM', prev, sym, next);
        if (sym in cons) {
            iast.push(cons[sym]);
            if (next in cons) {
                iast.push('a');
            } else if (next in ligas) {
                iast.push(ligas[next]);
            } else if (!next) {
                iast.push('a');
            }
        }
    });
    log('IAST', iast);
    // return 'satyānṛta';
    // return 'padaccheda';
    return iast.join('');
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


salita.prototype.hk2sa = function(str) {
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


function invert(obj) {
    var new_obj = {};
    for (var prop in obj) {
        if(obj.hasOwnProperty(prop)) {
            new_obj[obj[prop]] = prop;
        }
    }
    return new_obj;
};

function log() { console.log.apply(console, arguments) }
