#!/usr/bin/env bash

###############################################################
#INSTRUCTIONS TO RUN SCRIPT : START
###############################################################

###############################################################
#INSTRUCTIONS TO RUN SCRIPT : END
###############################################################

echo "Please paste in the full root url for the dev site you're working e.g http://psb29112021.dev.cogplatform.co.uk/ on then press enter"
read devSiteUrl
# Run Node Script First
Node sitemapper.js "$devSiteUrl"

fileOfUrls="sitemap.xml"
tempEditFile=temp_edit.txt

cat "$fileOfUrls" | pup 'text{}' | sed -r '/^\s*$/d' | sed -n '/^http*/p' >"$tempEditFile"
echo '[]' > dev-checks.json

mapfile -t devUrls <"$tempEditFile"

for url in "${devUrls[@]}"; do
    curl -s "$url" > tmp-1.html
    node c.js tmp-1.html "$url"
done


rm "$tempEditFile"

