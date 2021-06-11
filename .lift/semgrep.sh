#!/usr/bin/env bash

function tellApplicable() {
    # By default semgrep rules include only go, python, java, and javascript
    files=$(git ls-files | grep -E '.js|.java|.py|.go$' | head)
    res="broken"
    if [[ -z "$files" ]] ; then
        res="false"
    else
        res="true"
    fi
    printf "%s\n" "$res"
}

function tellVersion() {
    echo "1"
}

function tellName() {
    echo "Semgrep"
}

function emit_results() {
  echo "$1" | \
    jq '[.results | .[] | .line = .end.line | .file = .path | .message = .extra.message | .type = .check_id | .cwe = .extra.metadata.cwe | del(.extra) | del(.start) | del (.end) | del(.path) | del(.check_id) ]'
}

function run() {
    # Semgrep can blow up so we limit it to 10 minutes
    pip3 install --upgrade semgrep 2>/dev/null 1>/dev/null
    raw_results=$(timeout 10m semgrep --disable-version-check --json --config /opt/semgrep/semgrep-rules.yaml)
    result=$?
    if [[ $result = 0 ]] ; then
        emit_results "$raw_results"
    else
        printf "Tool timed out!" >&2
        exit $result
    fi
}

case "$3" in
    run)
        run
        ;;
    applicable)
        tellApplicable
        ;;
    name)
        tellName
        ;;
    *)
        tellVersion
        ;;
esac
