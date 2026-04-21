from playwright.sync_api import sync_playwright
from datetime import datetime, timezone

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()
    page.goto("https://berkeleyca.gov/your-government/city-council/city-council-agendas", timeout=60000, wait_until="domcontentloaded")
    
    rows = page.query_selector_all("tr")
    for row in rows:
        name_td = row.query_selector(".council-meeting-name")
        if not name_td:
            continue
        
        date_str = row.query_selector(".council-meeting-date time").get_attribute("datetime")
        date_td = datetime.fromisoformat(date_str.replace("Z", "+00:00"))
        now = datetime.now(timezone.utc)
        
        if date_td >= now: # we only care if its upcoming
            agenda = row.query_selector(".council-meeting-agenda").query_selector("a").get_attribute("href")
            url = "https://berkeleyca.gov" + name_td.query_selector("a").get_attribute("href")
            print("Agenda: " + str(agenda))
            print("Url: " + url)
            print("Name:" + name_td.query_selector("a").inner_text())
            print("Date: " + str(date_td))
            print("---")

    browser.close()
