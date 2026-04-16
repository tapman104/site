#!/bin/bash

PROJECT=$1
PAGE=$2

if [ -z "$PROJECT" ]; then
  echo "Usage: ./new-doc.sh <project> [page-name]"
  exit 1
fi

# Count existing pages to auto-set order
COUNT=$(ls _docs/$PROJECT/*.md 2>/dev/null | wc -l)
ORDER=$((COUNT + 1))

mkdir -p _docs/$PROJECT

if [ -z "$PAGE" ]; then
  PAGE="intro"
fi

FILE="_docs/$PROJECT/$PAGE.md"

if [ -f "$FILE" ]; then
  echo "⚠️  $FILE already exists"
  exit 1
fi

cat > $FILE << EOF
---
title: $(echo $PAGE | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)} 1')
doc: $PROJECT
order: $ORDER
---

# $(echo $PAGE | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)} 1')

Write your content here.
EOF

echo "✅ Created $FILE (order: $ORDER)"
