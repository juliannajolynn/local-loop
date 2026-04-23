from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()

    source = "https://www.change.org/local/oakland--ca--us?list_tags_filter=687742"
    print("Source: " + source)
    page.goto(source , timeout=60000, wait_until="domcontentloaded")
    
    rows = page.query_selector_all("article")
    i = 0
    for row in rows:
        if row.query_selector('[data-slot="header"]') and "Victory" in row.query_selector('[data-slot="header"]').inner_text():
            continue

        url = "https://www.change.org" + row.query_selector('a[data-discover="true"]').get_attribute("href")
        title = row.query_selector('a[data-discover="true"]').inner_text()
        i = i + 1

        signed = row.query_selector('[title$="signatures"]').get_attribute("title")

        print("URL: " + str(url))
        print("Title: " + str(title))
        print("Signed: " + str(signed))
        print("------------------")

    print("Petitions:" + str(i))              
   
    browser.close()