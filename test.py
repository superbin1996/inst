# import re

# txt = 'https://instagram-3mke.onrender.com/'
# x = re.search(r"^https://\w+-?\w+\.onrender\.com$", txt)
# print(x)

# x = txt.rstrip("/")
# print(x)


f = open("./client/.env", "a")
f.write("REACT_APP_RENDER_EXTERNAL_URL=https://instagram-3mke.onrender.com")
f.close()
