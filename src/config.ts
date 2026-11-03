// Editable concept identity and illustrative photography. No verified hotel listing.
// Each photograph has a specific editorial role; sources: public/images/sources.json.
export const hotel = {
  name: 'DAR ALMA', descriptor: 'UNE MAISON, UN AUTRE RYTHME',
  location: 'Maroc · destination à préciser', address: 'Adresse de la maison à renseigner, Maroc',
  email: 'bonjour@votre-hotel.example', phone: 'Téléphone à renseigner', rates: 'Tarifs à renseigner',
  notice: 'Concept hôtelier illustratif. Nom provisoire, photographies d’ambiance et expériences à personnaliser. Prestations non vérifiées.',
  film: { src:'/video/welcome-scroll.mp4', poster:'/video/welcome-poster.jpg', scrollScreens:3.5 },
  music: { src:'/audio/airport-lounge.m4a', title:'Airport Lounge', artist:'Kevin MacLeod', volume:.22, source:'https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100806' },
  introduction: {title: 'Un lieu à part.\nUne façon d’être.', text: 'Franchir le seuil. Laisser le monde à distance. Entre les lignes d’un palais, l’ombre des jardins et le murmure de l’eau, imaginer un Maroc qui se découvre doucement. Ici, le plus beau des luxes serait simplement de prendre le temps.'},
  photography: {
    entrance: { image:'/images/entrance.jpg' },
    house: { image:'/images/palace-lobby.webp', alt:'Salon de palais avec sol de marbre géométrique, fauteuils et vitraux colorés', position:'50% 58%', caption:'Le marbre, les vitraux, la lumière.' },
    wellness: { image:'/images/wellness-ritual.webp', alt:'Rituel de soin : une praticienne applique un soin sur le dos d’une personne allongée', position:'52% 50%' },
    dining: { image:'/images/moroccan-dining.webp', alt:'Table marocaine avec tajines en terre cuite, pains, salades et vaisselle traditionnelle', position:'63% 50%' }
  },
  suites: [
    {name:'La Suite Jardin', type:'UNE PARENTHÈSE VÉGÉTALE', image:'/images/garden-suite.webp', alt:'Chambre aux tons ivoire et olive, grand lit à tête de lit sculptée, tapis et mobilier en bois', position:'48% 50%', text:'Une tête de lit sculptée, des touches d’olive et des étoffes douces. Une inspiration de suite où les détails donnent le ton.'},
    {name:'La Résidence', type:'L’ESPRIT D’UNE MAISON PRIVÉE', image:'/images/private-residence.webp', alt:'Salon privé avec canapés, table basse, boiseries sombres et terrasse lumineuse', position:'55% 50%', text:'Un salon pour se retrouver, une terrasse pour prolonger le jour. Une proposition de résidence dont les espaces et services restent à définir.'}
  ],
  moments: [
    {time:'07:30', title:'Le jour se lève doucement.', text:'Une théière, des pains encore dorés, un jus d’orange sur la terrasse. Le matin prend son temps.', image:'/images/moroccan-breakfast.webp', alt:'Petit-déjeuner marocain sur une terrasse : théière, pains, viennoiseries et jus d’orange', position:'50% 65%', tag:'LE GOÛT DES MATINS'},
    {time:'11:00', title:'Ne suivre que la lumière.', text:'Le soleil sur le bassin, l’ombre des palmiers. Quelques longueurs, puis le plaisir de ne rien prévoir.', image:'/images/pool-daylight.webp', alt:'Piscine extérieure en plein jour, entourée de palmiers, jardins et parasols blancs', position:'50% 55%', tag:'ENTRE JARDIN ET BASSIN'},
    {time:'15:00', title:'Revenir à l’essentiel.', text:'La chaleur du hammam, le marbre sous la main, un silence enveloppant. Imaginer son rituel de bien-être.', image:'/images/marble-hammam.webp', alt:'Hammam de marbre beige avec deux tables de soin, serviettes et bassines en laiton', position:'50% 58%', tag:'LE TEMPS POUR SOI'},
    {time:'19:30', title:'Le soir se partage.', text:'Les lumières se tamisent, les tables se dressent. Une conversation qui dure, un dîner qui se savoure.', image:'/images/evening-restaurant.webp', alt:'Salle de restaurant le soir avec tables dressées, bougies et assises aux tons framboise', position:'48% 55%', tag:'À LA TABLE DU SOIR'}
  ],
  gallery: [
    {image:'/images/entrance.jpg', title:'Le palais à l’heure bleue', category:'La maison', supplied:true, position:'50% 50%'},
    {image:'/images/garden-suite.webp', title:'La douceur d’une chambre', category:'Les intérieurs', supplied:false, position:'48% 50%'},
    {image:'/images/private-residence.webp', title:'Un salon pour se retrouver', category:'Les intérieurs', supplied:false, position:'55% 50%'},
    {image:'/images/palace-lobby.webp', title:'Marbre et lumière', category:'La maison', supplied:false, position:'50% 50%'},
    {image:'/images/pool-daylight.webp', title:'Le bassin au soleil', category:'La maison', supplied:false, position:'50% 55%'},
    {image:'/images/marble-hammam.webp', title:'La chaleur du hammam', category:'Les rituels', supplied:false, position:'50% 58%'},
    {image:'/images/moroccan-breakfast.webp', title:'Le rituel du matin', category:'Les rituels', supplied:false, position:'50% 65%'},
    {image:'/images/moroccan-dining.webp', title:'Tajines et partage', category:'Les rituels', supplied:false, position:'63% 50%'}
  ]
};
