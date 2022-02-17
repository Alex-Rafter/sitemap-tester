#!/usr/bin/env bash

###############################################################
#INSTRUCTIONS TO RUN SCRIPT : START
###############################################################

# 1a: Make sure the first argument to script is the file of urls
# (set to work with .xml in current prototype)

# 1b: Make sure that file is in the same directory as this script

# 2: Run the script with the live site url as second argument,
# and the dev site url as third argument e.g
# e.g bash dev-checks.sh example-sitemap.xml https://www.dmkeith.com/ http://dmkeith.dev.cogplatform.co.uk/

###############################################################
#INSTRUCTIONS TO RUN SCRIPT : END
###############################################################
echo "Please paste in the full root url for the dev site you're working e.g http://psb29112021.dev.cogplatform.co.uk/ on then press enter"
read devSiteUrl
# Run Node Script First
Node sitemapper.js "$devSiteUrl"

fileOfUrls="sitemap.xml"
tempEditFile=temp_edit.txt
reportFile=dev_checks_report.html

cat "$fileOfUrls" | pup 'text{}' | sed -r '/^\s*$/d' | sed -n '/^http*/p' >"$tempEditFile"

mapfile -t devUrls <"$tempEditFile"

separatorEnd='<!-- ITEM : END -->'

for url in "${devUrls[@]}"; do

    curlResult=$(curl -s "$(echo "$url" | xargs)" | pup '[alt=""], meta[title=" #sitename#"], meta[content=""]')
    if [[ ! -z "$curlResult" ]]; then
        printf "<!--Problems identfied in: %s-->\n\n%s\n\n%s\n\n" "$url" "$curlResult" "$separatorEnd" >>"$reportFile"
    fi
done

awk -v probCount=0 -v imgCount=0 -v metaCount=0 -v reportFile="$reportFile" '/Problems identfied/ {probCount ++};
/alt=/ {imgCount ++};
/content=/ {metaCount ++};
END {printf "total urls with problems: %s\ntotal img tags with empty alt attrs: %s\ntotal meta tags with empty content attrs: %s\nFull report at %s", probCount, imgCount, metaCount, reportFile } 
' "$reportFile"

rm "$tempEditFile"