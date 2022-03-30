import React, { useEffect, useState } from "react";
import CardMedia from '@material-ui/core/CardMedia';

export default props => {
  const { srcs } = props;
  const [i, setI] = useState(0);

  useEffect(() => {
    const image = new Image();
    const checkValid = () => {
      if (image.complete && image.naturalWidth < 100 && image.naturalHeight < 100) {
        setI(i+1);
      }
    }

    image.onload = checkValid;
    image.src = srcs[i];
  }, [srcs]);

  return (
    <CardMedia style={{ paddingTop: '75%' }} image={srcs[i]} />
  );
};
