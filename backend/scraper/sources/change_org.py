from playwright.sync_api import sync_playwright
from datetime import datetime, timezone

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()
    page.goto("https://www.change.org/local/berkeley--ca--us?list_tags_filter=687742", timeout=60000, wait_until="domcontentloaded")
    
    rows = page.query_selector_all('a[href^="/p/"]')
    i = 0
    for row in rows:
        page = row.get_attribute("href")
        title = row.inner_text()
        i = i + 1

        print("Page:" + str(name))
        print("Title:" + str(title))
        print("------------------")

    print("Petitions:" + str(i))
   
    browser.close()
