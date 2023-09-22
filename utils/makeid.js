export const makeId = (Length) => {
  let name = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i <= Length; i += 1) {
    name += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return (name);
};
