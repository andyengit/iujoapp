export const validatePost = (data) => {
  const { title, content, userId, tags } = data;
  const errors = [];
  if (!title) {
    errors.push("Es necesario un titulo");
  }
  if(title.length < 3 || title.length > 60) {
    errors.push("El titulo debe tener entre 3 y 60 caracteres");
  }
  if (!content) {
    errors.push("Es necesario un contenido");
  }
  if(content.length < 3 || content.length > 1000) {
    errors.push("El contenido debe tener minimo 3 caracteres");
  }
  if (!userId) {
    errors.push("Es necesario un usuario");
  }
  if (tags){
    let moreThanOne = false;
    for(let x = 0; x < tags.length; x++) {
      if (tags[x].length < 3 || tags[x].length > 15){
	      moreThanOne = true;
      }  
    }
    if (moreThanOne) {
      errors.push("Las etiquetas deben tener entre 3 y 15 caracteres");
    }
  }
  return errors.join(", ");
}
