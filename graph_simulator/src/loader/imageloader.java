package loader;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;

public class imageloader {

	public static void main(String[] arg) {
		BufferedImage a = loadImage("/active.png");

	}

	public static BufferedImage loadImage(String path) {

		try {
			return ImageIO.read(imageloader.class.getResource(path));
		} catch (IOException e) {

			System.exit(1);
		}
		return null;
	}
}
