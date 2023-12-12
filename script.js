window.onload = function() {


    // load image and display on canvas
    const canvas1 = document.getElementById('canvas1');
    const ctx1 = canvas1.getContext('2d');

    const image1 = new Image();
    image1.src = './gfx/minions.jpg'; // Make sure the path to your image is correct

    image1.onload = function() {
        // Calculate the scale to fit the image inside the canvas while maintaining aspect ratio
        const scaleWidth = canvas1.width / image1.width;
        const scaleHeight = canvas1.height / image1.height;
        const scale = Math.max(scaleWidth, scaleHeight);

        // Calculate the x and y coordinates to center the image on the canvas
        const x = (canvas1.width / 2) - (image1.width / 2) * scale;
        const y = (canvas1.height / 2) - (image1.height / 2) * scale;

        // Clear the canvas before drawing the new image
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

        // Draw the image
        ctx1.drawImage(image1, x, y, image1.width * scale, image1.height * scale);

        // setup bbox
        BoxCraft.createResizableBBox(document.getElementById('canvas1'), function(topleft, bottomright) {
            console.log(topleft, bottomright);
        });


    };


    



    // load image and display on canvas
    const canvas2 = document.getElementById('canvas2');
    const ctx2 = canvas2.getContext('2d');

    const image2 = new Image();
    image2.src = './gfx/minions.jpg'; // Make sure the path to your image is correct

    image2.onload = function() {
        // Calculate the scale to fit the image inside the canvas while maintaining aspect ratio
        const scaleWidth = canvas2.width / image2.width;
        const scaleHeight = canvas2.height / image2.height;
        const scale = Math.max(scaleWidth, scaleHeight);

        // Calculate the x and y coordinates to center the image on the canvas
        const x = (canvas2.width / 2) - (image2.width / 2) * scale;
        const y = (canvas2.height / 2) - (image2.height / 2) * scale;

        // Clear the canvas before drawing the new image
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

        // Draw the image
        ctx2.drawImage(image2, x, y, image2.width * scale, image2.height * scale);

        // setup bbox
        BoxCraft.createDraggableBBox(document.getElementById('canvas2'), function(topleft, bottomright) {
            console.log(topleft, bottomright);
        });


    };

}