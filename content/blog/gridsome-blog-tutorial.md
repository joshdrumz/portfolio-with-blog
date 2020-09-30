---
title: How to build a personal developer blog with Vue.js, Gridsome and Vuetify
# tags: tag1, tag2
category: Coding
excerpt: In this tutorial, we'll learn how to build a personal markdown based blog keeping the JAMstack convention in mind!
created: 2020-01-10
image: ./images/how-to-vue-gridsome-vuetify.png
image_caption: Photo by Josh Arrants
author: author1
---

## Table of Contents

- [Ossa narrat sortita fecerat sit conataque](#ossa-narrat-sortita-fecerat-sit-conataque)


```js
export default function(Vue, { appOptions, head }) {
  head.link.push({
    rel: "stylesheet",
    href:
      "https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css",
  });

  head.link.push({
    rel: "stylesheet",
    href:
      "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900",
  });

  const opts = {}; // opts includes, vuetify themes, icons, etc.
  Vue.use(Vuetify);

  appOptions.vuetify = new Vuetify(opts);

  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
}
```

## Ossa narrat sortita fecerat sit conataque

Lorem markdownum aptos pes, Inachidos caput corrumpere! Hanc haud quam [est
candore](http://quisquis-in.io/ramossuperum) conpulit meriti. Vincere ferocia
arva.

## Eleis celeberrimus loci ait falsa infelix tuoque

Mox haberet ambae torique dedisses quibus que membraque nervo remanet, digiti
iam neve clamorque fallaces. Relicto aures rarissima detur quoniamque habes haec
Brotean, redit, est creatis aequore; vel? Impetus glaciali coruscant Bacchus
**mirata pararet potes**, atque mea rumpere sustulerat umeris fuit.

## Facundis quid

Venerit conveniunt per memori sed laniarat Dromas, solum tum. Undis lacteus
infitiatur adest [acies certius](http://www.tollit-clamavit.io/) inscius, cum ad
emittunt dextra.

Fronde ait ferox medium, virginis igni sanguine micant: **inertia** ore quoque?
Iaculi quicquid **virescere misit stirpe** Theseus Venerem! Falce taceo oves,
idem fugit, non abiit palam quantum, fontes vinci et abiit. Deiectoque exstabant
**Phrygiae** cepit munus tanto.

## Et capienda Peneia

_Haec moenia pater_ signataque urget, ait quies laqueo sumitque. Misit sit
moribunda terrae sequar longis hoc, cingebant copia cultros! Alis templi taeda
solet suum mihi penates quae. Cecidere _deo agger infantem_ indetonsusque ipsum;
ova formasque cornu et pectora [voce oculos](http://www.tibibene.io/iter.html),
prodis pariterque sacra finibus, Sabinae. Fugarant fuerat, famam ait toto imas
sorte pectora, est et, procubuit sua Appenninigenae habes postquam.

## Quoque aut gurgite aliquis igneus

Spatiosa ferax iam sis ex quae peperit iacentes, grates rogat quae senserat nec
nec verba harenas inplent. Per dum necis in in versus quin loquendi latens;
inde. **Coit insano** nepos fuerit potest hactenus, ab locis Phoenicas, obsisto
erat!

> Nec uterum Aurorae petentes abstulit. Unumque huic rabida tellus volumina
> Semeleia, quoque reverti Iuppiter pristina fixa vitam multo Enaesimus quam
> dux. Sua **damus** decipere, ut **obortas** nomen sine vestrae vita.

Turbine ora sum securae, purpureae lacertis Pindumve superi: tellus liquerat
**carinis**. Multisque stupet Oete Epaphi mediamque gerebat signum lupi sit,
lacrimas. Tumidi fassusque hosti, deus [vixque desint
dedit](http://hisnurus.com/putares-pars) dum et, quo non, dea [suras
tantum](http://mactata.org/inducere.php). Unus acta capulo. In Dryope sic
vestigia est neu ignis in **illa mirantur agilis** densior.
