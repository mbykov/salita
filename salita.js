// salita.js module
var c = require('./lib/constants');

module.exports = salita();

function salita() {
    if (!(this instanceof salita)) return new salita();
}

salita.prototype.slp2sa = function(str) {
    str = str.replace('/', '');
    str = str.replace('-', '');
    var arr = str.split('');
    var sk = [];
    arr.forEach(function(letr, idx) {
        var prev = arr[idx-1];
        if (idx == 0 && letr in Vowels) sk[0] = Vowels[letr];
        // if (prev == '-' && letr in Vowels) sk[idx] = Vowels[letr];
        if (prev in consonants) {
            if (letr in vowels) {
                sk[idx-1] = consonants[prev];
                sk[idx] = vowels[letr];
            } else if (letr in consonants) {
                sk[idx-1] = consonants[prev] + '्';
            }
        }
        if (idx == (arr.length-1) && letr in consonants) sk[idx] = consonants[letr] + '्';
        if (arr[idx] in signs) { sk[idx] = signs[letr]; }
        if (arr[idx] in numbers) { sk[idx] = numbers[letr]; }
    });
    return sk.join('');
}

salita.prototype.sa2slp = function(str) {
    var consonants_ = invert(consonants);
    var  vowels_ = invert(vowels);
    var  Vowels_ = invert(Vowels);
    var  signs_ = invert(signs);
    var  numbers_ = invert(numbers);
    var arr = str.split('');
    var slp = [];
    arr.forEach(function(letr, idx) {
        var prev = arr[idx-1];
        if (idx == 0 && letr in Vowels_) slp[0] = Vowels_[letr];
        if (prev in consonants_) {
            if (letr in vowels_) {
                slp[idx-1] = consonants_[prev];
                slp[idx] = vowels_[letr];
            } else if (letr in consonants_ || letr in signs_) {
                slp[idx-1] = consonants_[prev] + 'a';
            } else if (letr == '्') {
                slp[idx-1] = consonants_[prev];
            }
        }
        if (idx == (arr.length-1) && letr in consonants_) slp[idx] = consonants_[letr] + 'a';
        if (arr[idx] in signs_) { slp[idx] = signs_[letr]; }
        if (arr[idx] in numbers_) { slp[idx] = numbers_[letr]; }
    });
    return slp.join('');
}

salita.prototype.sa2iast = function(str) {
    str = clean(str);
    var cons = invert(c.consIAST);
    var  ligas = invert(c.ligaIAST);
    var  vowels = invert(c.vowelIAST);
    var  signs = invert(c.signsIAST);
    var  numbers_ = invert(numbers);
    var arr = str.split('');
    var iast = [];
    arr.forEach(function(sym, idx) {
        var prev = arr[idx-1];
        var next = arr[idx+1];
        if (sym in cons) {
            iast.push(cons[sym]);
            if (next in cons) {
                iast.push('a');
            } else if (next in ligas) {
                iast.push(ligas[next]);
            } else if (!next) {
                iast.push('a');
            }
        } else if (sym in signs) {
            if (prev in cons) iast.push('a');
            iast.push(signs[sym]);
        } else if (sym in vowels) {
            iast.push(vowels[sym]);
        } else if (sym in numbers_) {
            iast.push(numbers_[sym]);
        }
    });
    return iast.join('');
}

salita.prototype.iast2sa = function(str) {
    str = clean(str);
    var cons = c.consIAST;
    var  ligas = c.ligaIAST;
    var  vowels = c.vowelIAST;
    var  signs = c.signsIAST;
    var arr = str.split('');
    var mixed = [];
    var sa = [];
    arr.forEach(function(sym, idx) {
        var prev = arr[idx-1];
        if (sym == 'h' && c.aspIAST.indexOf(prev) > -1) {
            mixed.pop();
            var asp = [prev, 'h'].join('');
            mixed.push(c.virama);
            mixed.push(cons[asp]);
        } else if (inc(['i', 'u'], sym) && prev == 'a') {
            mixed.pop();
            var diph = ['a', sym].join('');
            var vow = (idx == 0) ? vowels[diph] : ligas[diph];
            mixed.push(vow);
        } else {
            mixed.push(sym);
        }
    });

    mixed.forEach(function(sym, idx) {
        var prev = mixed[idx-1];
        var next = mixed[idx+1];
        if (sym in cons) {
            sa.push(cons[sym]);
            if ((next in cons) || !next) {
                sa.push(c.virama);
            }
        } else if (idx != 0 && sym in ligas) {
            sa.push(ligas[sym]);
        } else if (idx == 0 && sym in vowels) {
            sa.push(vowels[sym]);
        } else if (sym in signs) {
            sa.push(signs[sym]);
        } else if (sym in numbers) {
            sa.push(numbers[sym]);
        } else {
            sa.push(sym);
        }
    });
    return sa.join('');
}

var signs = {
    "'": "ऽ",
    "^": "ँ",
    "/": "́",
    "H": "ः",
    "M": "ं",
    "-": "-",
    ".": "."
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

// ०१२३४५६७८९
var numbers = {
    "0": "०",
    "1": "१",
    "2": "२",
    "3": "३",
    "4": "४",
    "5": "५",
    "6": "६",
    "7": "७",
    "8": "८",
    "9": "९"
}



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
    arr.forEach(function(letr, idx) {
        prev = arr[idx-1];
        if (prev && (letr in iconsHK) && (prev in iconsHK)) {
            letr = c.virama + letr;
        }
        sk.push(letr);
    });
    str = sk.join('');
    if (str.slice(-1) in iconsHK) str = [str, c.virama].join('');
    str = str.split('|').join('');
    return str;
}

function clean(str) {
    str = str.trim();
    str = str.split('/').join('');
    // str = str.split('-').join('');
    str = str.split('|').join('');
    return str;
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

function inc(arr, item) {
    return (arr.indexOf(item) > -1) ? true : false;
}
