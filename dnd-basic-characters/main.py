"""
Simple script to pull html pages for dnd basic characters,
And output them as an image.

TODO PDF instead of image
"""

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from datetime import datetime
from time import strftime, sleep

TPK_BASIC_URL = "https://character.totalpartykill.ca/basic/" # D&D B/X Level 1 character.

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--hide-scrollbars")

print("Loading webdriver.")
driver = webdriver.Chrome(options=chrome_options)
driver.set_window_size(600, 750)
sleep(1)
size = driver.get_window_size()
print(f"Window size: width={size['width']}px, height={size['height']}px.")

if __name__ == '__main__':

	for i in range(100):
		print(f"Generating PC {i+1}.")
		driver.get(TPK_BASIC_URL)
		#driver.save_screenshot(f"./out/dnd-bx-pc-{datetime.now().strftime('%Y%m%d-%H%M%S')}.png")
		driver.save_screenshot(f"./out/dnd-bx-pc-{i+1:03}.png")
		sleep(1)

	print("Done.")

