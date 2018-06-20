<template>

  <div class="whiteboard">
    <a href="#" id="nav-button">
      <span>
        NAV
        <img src="whiteboard-navbar.png">
      </span>
    </a>
    <div class="tocify-wrapper">
      <img src="whiteboard-logo.png">
      <div class="search">
        <input type="text" class="search" id="input-search" placeholder="Search">
      </div>
      <ul class="search-results"></ul>
      <div id="toc">
      </div>
        <ul class="toc-footer">
          <li>Some footer content here</li>
        </ul>
    </div>
    <div class="page-wrapper">
      <div class="content">
        
        <h1 id="lbry-json-rpc-api-documentation">LBRY JSON-RPC API Documentation</h1><h2 id="blob_announce">blob_announce</h2>
<p>Announce blobs to the DHT</p>
<h3 id="args">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>blob_hash</td>
<td>(str)</td>
<td></td>
<td>announce a blob, specified by blob_hash</td>
</tr>
<tr>
<td>stream_hash</td>
<td>(str)</td>
<td></td>
<td>announce all blobs associated withstream_hash</td>
</tr>
<tr>
<td>sd_hash</td>
<td>(str)</td>
<td></td>
<td>announce all blobs associated withsd_hash and the sd_hash itself</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (bool) true if successful
</code></pre><h2 id="blob_availability">blob_availability</h2>
<p>Get blob availability</p>
<h3 id="args-2">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>blob_hash</td>
<td>(str)</td>
<td></td>
<td>check availability for this blob hash</td>
</tr>
<tr>
<td>search_timeout</td>
<td>(int)</td>
<td></td>
<td>how long to search for peers for the blobin the dht</td>
</tr>
<tr>
<td>blob_timeout</td>
<td>(int)</td>
<td></td>
<td>how long to try downloading from a peer</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (dict) {
        "is_available": &lt;bool, true if blob is available from a peer from peer list&gt;
        "reachable_peers": ["&lt;ip&gt;:&lt;port&gt;"],
        "unreachable_peers": ["&lt;ip&gt;:&lt;port&gt;"]
    }
</code></pre><h2 id="blob_delete">blob_delete</h2>
<p>Delete a blob</p>
<h3 id="args-3">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>blob_hash</td>
<td>(str)</td>
<td></td>
<td>blob hash of the blob to delete</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (str) Success/fail message
</code></pre><h2 id="blob_get">blob_get</h2>
<p>Download and return a blob</p>
<h3 id="args-4">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>blob_hash</td>
<td>(str)</td>
<td>required</td>
<td>blob hash of the blob to get</td>
</tr>
<tr>
<td>timeout</td>
<td>(int)</td>
<td></td>
<td>timeout in number of seconds</td>
</tr>
<tr>
<td>encoding</td>
<td>(str)</td>
<td></td>
<td>by default no attempt at decodingis made, can be set to one of thefollowing decoders:'json'</td>
</tr>
<tr>
<td>payment_rate_manager</td>
<td>(str)</td>
<td></td>
<td>if not given the default payment ratemanager will be used.supported alternative rate managers:'only-free'</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (str) Success/Fail message or (dict) decoded data
</code></pre><h2 id="blob_list">blob_list</h2>
<p>Returns blob hashes. If not given filters, returns all blobs known by the blob manager</p>
<h3 id="args-5">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>needed</td>
<td>(bool)</td>
<td></td>
<td>only return needed blobs</td>
</tr>
<tr>
<td>finished</td>
<td>(bool)</td>
<td></td>
<td>only return finished blobs</td>
</tr>
<tr>
<td>uri</td>
<td>(str)</td>
<td></td>
<td>filter blobs by stream in a uri</td>
</tr>
<tr>
<td>stream_hash</td>
<td>(str)</td>
<td></td>
<td>filter blobs by stream hash</td>
</tr>
<tr>
<td>sd_hash</td>
<td>(str)</td>
<td></td>
<td>filter blobs by sd hash</td>
</tr>
<tr>
<td>page_size</td>
<td>(int)</td>
<td></td>
<td>results page size</td>
</tr>
<tr>
<td>page</td>
<td>(int)</td>
<td></td>
<td>page of results to return</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (list) List of blob hashes
</code></pre><h2 id="blob_reflect">blob_reflect</h2>
<p>Reflects specified blobs</p>
<h3 id="args-6">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>reflector_server</td>
<td>(str)</td>
<td></td>
<td>reflector address</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (list) reflected blob hashes
</code></pre><h2 id="blob_reflect_all">blob_reflect_all</h2>
<p>Reflects all saved blobs</p>
<h3 id="args-7">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (bool) true if successful
</code></pre><h2 id="block_show">block_show</h2>
<p>Get contents of a block</p>
<h3 id="args-8">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>blockhash</td>
<td>(str)</td>
<td>required</td>
<td>hash of the block to look up</td>
</tr>
<tr>
<td>height</td>
<td>(int)</td>
<td>required</td>
<td>height of the block to look up</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (dict) Requested block
</code></pre><h2 id="channel_export">channel_export</h2>
<p>Export serialized channel signing information for a given certificate claim id</p>
<h3 id="args-9">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>claim_id</td>
<td>(str)</td>
<td>required</td>
<td>Claim ID to export information about</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (str) Serialized certificate information
</code></pre><h2 id="channel_import">channel_import</h2>
<p>Import serialized channel signing information (to allow signing new claims to the channel)</p>
<h3 id="args-10">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>serialized_certificate_info</td>
<td>(str)</td>
<td>required</td>
<td>certificate info</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (dict) Result dictionary
</code></pre><h2 id="channel_list">channel_list</h2>
<p>Get certificate claim infos for channels that can be published to</p>
<h3 id="args-11">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (list) ClaimDict, includes 'is_mine' field to indicate if the certificate claim
    is in the wallet.
</code></pre><h2 id="channel_new">channel_new</h2>
<p>Generate a publisher key and create a new '@' prefixed certificate claim</p>
<h3 id="args-12">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>channel_name</td>
<td>(str)</td>
<td>required</td>
<td>name of the channel prefixed with '@'</td>
</tr>
<tr>
<td>amount</td>
<td>(float)</td>
<td>required</td>
<td>bid amount on the channel</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (dict) Dictionary containing result of the claim
    {
        'tx' : (str) hex encoded transaction
        'txid' : (str) txid of resulting claim
        'nout' : (int) nout of the resulting claim
        'fee' : (float) fee paid for the claim transaction
        'claim_id' : (str) claim ID of the resulting claim
    }
</code></pre><h2 id="claim_abandon">claim_abandon</h2>
<p>Abandon a name and reclaim credits from the claim</p>
<h3 id="args-13">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>claim_id</td>
<td>(str)</td>
<td></td>
<td>claim_id of the claim to abandon</td>
</tr>
<tr>
<td>txid</td>
<td>(str)</td>
<td></td>
<td>txid of the claim to abandon</td>
</tr>
<tr>
<td>nout</td>
<td>(int)</td>
<td></td>
<td>nout of the claim to abandon</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (dict) Dictionary containing result of the claim
    {
        txid : (str) txid of resulting transaction
        fee : (float) fee paid for the transaction
    }
</code></pre><h2 id="claim_list">claim_list</h2>
<p>List current claims and information about them for a given name</p>
<h3 id="args-14">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>name</td>
<td>(str)</td>
<td>required</td>
<td>name of the claim to list info about</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (dict) State of claims assigned for the name
    {
        'claims': (list) list of claims for the name
        [
            {
            'amount': (float) amount assigned to the claim
            'effective_amount': (float) total amount assigned to the claim,
                                including supports
            'claim_id': (str) claim ID of the claim
            'height': (int) height of block containing the claim
            'txid': (str) txid of the claim
            'nout': (int) nout of the claim
            'permanent_url': (str) permanent url of the claim,
            'supports': (list) a list of supports attached to the claim
            'value': (str) the value of the claim
            },
        ]
        'supports_without_claims': (list) supports without any claims attached to them
        'last_takeover_height': (int) the height of last takeover for the name
    }
</code></pre><h2 id="claim_list_by_channel">claim_list_by_channel</h2>
<p>Get paginated claims in a channel specified by a channel uri</p>
<h3 id="args-15">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>uri</td>
<td>(str)</td>
<td>required</td>
<td>uri of the channel</td>
</tr>
<tr>
<td>uris</td>
<td>(list)</td>
<td></td>
<td>uris of the channel</td>
</tr>
<tr>
<td>page</td>
<td>(int)</td>
<td></td>
<td>which page of results to return where page 1 is the firstpage, defaults to no pages</td>
</tr>
<tr>
<td>page_size</td>
<td>(int)</td>
<td></td>
<td>number of results in a page, default of 10</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    {
         resolved channel uri: {
            If there was an error:
            'error': (str) error message

            'claims_in_channel': the total number of results for the channel,

            If a page of results was requested:
            'returned_page': page number returned,
            'claims_in_channel': [
                {
                    'absolute_channel_position': (int) claim index number in sorted list of
                                                 claims which assert to be part of the
                                                 channel
                    'address': (str) claim address,
                    'amount': (float) claim amount,
                    'effective_amount': (float) claim amount including supports,
                    'claim_id': (str) claim id,
                    'claim_sequence': (int) claim sequence number,
                    'decoded_claim': (bool) whether or not the claim value was decoded,
                    'height': (int) claim height,
                    'depth': (int) claim depth,
                    'has_signature': (bool) included if decoded_claim
                    'name': (str) claim name,
                    'supports: (list) list of supports [{'txid': (str) txid,
                                                         'nout': (int) nout,
                                                         'amount': (float) amount}],
                    'txid': (str) claim txid,
                    'nout': (str) claim nout,
                    'signature_is_valid': (bool), included if has_signature,
                    'value': ClaimDict if decoded, otherwise hex string
                }
            ],
        }
    }
</code></pre><h2 id="claim_list_mine">claim_list_mine</h2>
<p>List my name claims</p>
<h3 id="args-16">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (list) List of name claims owned by user
    [
        {
            'address': (str) address that owns the claim
            'amount': (float) amount assigned to the claim
            'blocks_to_expiration': (int) number of blocks until it expires
            'category': (str) "claim", "update" , or "support"
            'claim_id': (str) claim ID of the claim
            'confirmations': (int) number of blocks of confirmations for the claim
            'expiration_height': (int) the block height which the claim will expire
            'expired': (bool) true if expired, false otherwise
            'height': (int) height of the block containing the claim
            'is_spent': (bool) true if claim is abandoned, false otherwise
            'name': (str) name of the claim
            'permanent_url': (str) permanent url of the claim,
            'txid': (str) txid of the cliam
            'nout': (int) nout of the claim
            'value': (str) value of the claim
        },
   ]
</code></pre><h2 id="claim_new_support">claim_new_support</h2>
<p>Support a name claim</p>
<h3 id="args-17">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>name</td>
<td>(str)</td>
<td>required</td>
<td>name of the claim to support</td>
</tr>
<tr>
<td>claim_id</td>
<td>(str)</td>
<td>required</td>
<td>claim_id of the claim to support</td>
</tr>
<tr>
<td>amount</td>
<td>(float)</td>
<td>required</td>
<td>amount of support</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (dict) Dictionary containing result of the claim
    {
        txid : (str) txid of resulting support claim
        nout : (int) nout of the resulting support claim
        fee : (float) fee paid for the transaction
    }
</code></pre><h2 id="claim_renew">claim_renew</h2>
<p>Renew claim(s) or support(s)</p>
<h3 id="args-18">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>outpoint</td>
<td>(str)</td>
<td>required</td>
<td>outpoint of the claim to renew</td>
</tr>
<tr>
<td>height</td>
<td>(str)</td>
<td>required</td>
<td>update claims expiring before or at this block height</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (dict) Dictionary where key is the the original claim's outpoint and
    value is the result of the renewal
    {
        outpoint:{

            'tx' : (str) hex encoded transaction
            'txid' : (str) txid of resulting claim
            'nout' : (int) nout of the resulting claim
            'fee' : (float) fee paid for the claim transaction
            'claim_id' : (str) claim ID of the resulting claim
        },
    }
</code></pre><h2 id="claim_send_to_address">claim_send_to_address</h2>
<p>Send a name claim to an address</p>
<h3 id="args-19">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>claim_id</td>
<td>(str)</td>
<td>required</td>
<td>claim_id to send</td>
</tr>
<tr>
<td>address</td>
<td>(str)</td>
<td>required</td>
<td>address to send the claim to</td>
</tr>
<tr>
<td>amount</td>
<td>(int)</td>
<td></td>
<td>Amount of credits to claim name for, defaults to the current amounton the claim</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (dict) Dictionary containing result of the claim
    {
        'tx' : (str) hex encoded transaction
        'txid' : (str) txid of resulting claim
        'nout' : (int) nout of the resulting claim
        'fee' : (float) fee paid for the claim transaction
        'claim_id' : (str) claim ID of the resulting claim
    }
</code></pre><h2 id="claim_show">claim_show</h2>
<p>Resolve claim info from txid/nout or with claim ID</p>
<h3 id="args-20">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>txid</td>
<td>(str)</td>
<td></td>
<td>look for claim with this txid, nout mustalso be specified</td>
</tr>
<tr>
<td>nout</td>
<td>(int)</td>
<td></td>
<td>look for claim with this nout, txid mustalso be specified</td>
</tr>
<tr>
<td>claim_id</td>
<td>(str)</td>
<td></td>
<td>look for claim with this claim id</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (dict) Dictionary containing claim info as below,

    {
        'txid': (str) txid of claim
        'nout': (int) nout of claim
        'amount': (float) amount of claim
        'value': (str) value of claim
        'height' : (int) height of claim takeover
        'claim_id': (str) claim ID of claim
        'supports': (list) list of supports associated with claim
    }

    if claim cannot be resolved, dictionary as below will be returned

    {
        'error': (str) reason for error
    }
</code></pre><h2 id="cli_test_command">cli_test_command</h2>
<p>This command is only for testing the CLI argument parsing</p>
<h3 id="args-21">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>a_arg</td>
<td>a</td>
<td></td>
<td>arg</td>
</tr>
<tr>
<td>b_arg</td>
<td>b</td>
<td></td>
<td>arg</td>
</tr>
<tr>
<td>pos_arg</td>
<td>pos</td>
<td>required</td>
<td>arg</td>
</tr>
<tr>
<td>pos_args</td>
<td>pos</td>
<td></td>
<td>args</td>
</tr>
<tr>
<td>pos_arg2</td>
<td>pos</td>
<td></td>
<td>arg 2</td>
</tr>
<tr>
<td>pos_arg3</td>
<td>pos</td>
<td></td>
<td>arg 3</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    pos args
</code></pre><h2 id="commands">commands</h2>
<p>Return a list of available commands</p>
<h3 id="args-22">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (list) list of available commands
</code></pre><h2 id="daemon_stop">daemon_stop</h2>
<p>Stop lbrynet-daemon</p>
<h3 id="args-23">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (string) Shutdown message
</code></pre><h2 id="file_delete">file_delete</h2>
<p>Delete a LBRY file</p>
<h3 id="args-24">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>delete_from_download_dir</td>
<td>(bool)</td>
<td></td>
<td>delete file from download directory,instead of just deleting blobs</td>
</tr>
<tr>
<td>delete_all</td>
<td>(bool)</td>
<td></td>
<td>if there are multiple matching files,allow the deletion of multiple files.Otherwise do not delete anything.</td>
</tr>
<tr>
<td>sd_hash</td>
<td>(str)</td>
<td></td>
<td>delete by file sd hash</td>
</tr>
<tr>
<td>file_name</td>
<td>(str)</td>
<td></td>
<td>delete by file name in downloads folder</td>
</tr>
<tr>
<td>stream_hash</td>
<td>(str)</td>
<td></td>
<td>delete by file stream hash</td>
</tr>
<tr>
<td>rowid</td>
<td>(int)</td>
<td></td>
<td>delete by file row id</td>
</tr>
<tr>
<td>claim_id</td>
<td>(str)</td>
<td></td>
<td>delete by file claim id</td>
</tr>
<tr>
<td>txid</td>
<td>(str)</td>
<td></td>
<td>delete by file claim txid</td>
</tr>
<tr>
<td>nout</td>
<td>(int)</td>
<td></td>
<td>delete by file claim nout</td>
</tr>
<tr>
<td>claim_name</td>
<td>(str)</td>
<td></td>
<td>delete by file claim name</td>
</tr>
<tr>
<td>channel_claim_id</td>
<td>(str)</td>
<td></td>
<td>delete by file channel claim id</td>
</tr>
<tr>
<td>channel_name</td>
<td>(str)</td>
<td></td>
<td>delete by file channel claim name</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (bool) true if deletion was successful
</code></pre><h2 id="file_list">file_list</h2>
<p>List files limited by optional filters</p>
<h3 id="args-25">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>sd_hash</td>
<td>(str)</td>
<td></td>
<td>get file with matching sd hash</td>
</tr>
<tr>
<td>file_name</td>
<td>(str)</td>
<td></td>
<td>get file with matching file name in thedownloads folder</td>
</tr>
<tr>
<td>stream_hash</td>
<td>(str)</td>
<td></td>
<td>get file with matching stream hash</td>
</tr>
<tr>
<td>rowid</td>
<td>(int)</td>
<td></td>
<td>get file with matching row id</td>
</tr>
<tr>
<td>claim_id</td>
<td>(str)</td>
<td></td>
<td>get file with matching claim id</td>
</tr>
<tr>
<td>outpoint</td>
<td>(str)</td>
<td></td>
<td>get file with matching claim outpoint</td>
</tr>
<tr>
<td>txid</td>
<td>(str)</td>
<td></td>
<td>get file with matching claim txid</td>
</tr>
<tr>
<td>nout</td>
<td>(int)</td>
<td></td>
<td>get file with matching claim nout</td>
</tr>
<tr>
<td>channel_claim_id</td>
<td>(str)</td>
<td></td>
<td>get file with matching channel claim id</td>
</tr>
<tr>
<td>channel_name</td>
<td>(str)</td>
<td></td>
<td>get file with matching channel name</td>
</tr>
<tr>
<td>claim_name</td>
<td>(str)</td>
<td></td>
<td>get file with matching claim name</td>
</tr>
<tr>
<td>full_status</td>
<td>(bool)</td>
<td></td>
<td>full status, populate the'message' and 'size' fields</td>
</tr>
<tr>
<td>sort</td>
<td>(str)</td>
<td></td>
<td>sort by any property, like 'file_name'or 'metadata.author'; to specify directionappend ',asc' or ',desc'</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (list) List of files

    [
        {
            'completed': (bool) true if download is completed,
            'file_name': (str) name of file,
            'download_directory': (str) download directory,
            'points_paid': (float) credit paid to download file,
            'stopped': (bool) true if download is stopped,
            'stream_hash': (str) stream hash of file,
            'stream_name': (str) stream name ,
            'suggested_file_name': (str) suggested file name,
            'sd_hash': (str) sd hash of file,
            'download_path': (str) download path of file,
            'mime_type': (str) mime type of file,
            'key': (str) key attached to file,
            'total_bytes': (int) file size in bytes, None if full_status is false,
            'written_bytes': (int) written size in bytes,
            'blobs_completed': (int) num_completed, None if full_status is false,
            'blobs_in_stream': (int) None if full_status is false,
            'status': (str) downloader status, None if full_status is false,
            'claim_id': (str) None if full_status is false or if claim is not found,
            'outpoint': (str) None if full_status is false or if claim is not found,
            'txid': (str) None if full_status is false or if claim is not found,
            'nout': (int) None if full_status is false or if claim is not found,
            'metadata': (dict) None if full_status is false or if claim is not found,
            'channel_claim_id': (str) None if full_status is false or if claim is not found or signed,
            'channel_name': (str) None if full_status is false or if claim is not found or signed,
            'claim_name': (str) None if full_status is false or if claim is not found
        },
    ]
</code></pre><h2 id="file_reflect">file_reflect</h2>
<p>Reflect all the blobs in a file matching the filter criteria</p>
<h3 id="args-26">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>sd_hash</td>
<td>(str)</td>
<td></td>
<td>get file with matching sd hash</td>
</tr>
<tr>
<td>file_name</td>
<td>(str)</td>
<td></td>
<td>get file with matching file name in thedownloads folder</td>
</tr>
<tr>
<td>stream_hash</td>
<td>(str)</td>
<td></td>
<td>get file with matching stream hash</td>
</tr>
<tr>
<td>rowid</td>
<td>(int)</td>
<td></td>
<td>get file with matching row id</td>
</tr>
<tr>
<td>reflector</td>
<td>(str)</td>
<td></td>
<td>reflector server, ip address or urlby default choose a server from the config</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (list) list of blobs reflected
</code></pre><h2 id="file_set_status">file_set_status</h2>
<p>Start or stop downloading a file</p>
<h3 id="args-27">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>status</td>
<td>(str)</td>
<td>required</td>
<td>one of "start" or "stop"</td>
</tr>
<tr>
<td>sd_hash</td>
<td>(str)</td>
<td></td>
<td>set status of file with matching sd hash</td>
</tr>
<tr>
<td>file_name</td>
<td>(str)</td>
<td></td>
<td>set status of file with matching file name in thedownloads folder</td>
</tr>
<tr>
<td>stream_hash</td>
<td>(str)</td>
<td></td>
<td>set status of file with matching stream hash</td>
</tr>
<tr>
<td>rowid</td>
<td>(int)</td>
<td></td>
<td>set status of file with matching row id</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (str) Confirmation message
</code></pre><h2 id="get">get</h2>
<p>Download stream from a LBRY name.</p>
<h3 id="args-28">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>uri</td>
<td>(str)</td>
<td></td>
<td>uri of the content to download</td>
</tr>
<tr>
<td>file_name</td>
<td>(str)</td>
<td></td>
<td>specified name for the downloaded file</td>
</tr>
<tr>
<td>timeout</td>
<td>(int)</td>
<td></td>
<td>download timeout in number of seconds</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (dict) Dictionary containing information about the stream
    {
        'completed': (bool) true if download is completed,
        'file_name': (str) name of file,
        'download_directory': (str) download directory,
        'points_paid': (float) credit paid to download file,
        'stopped': (bool) true if download is stopped,
        'stream_hash': (str) stream hash of file,
        'stream_name': (str) stream name ,
        'suggested_file_name': (str) suggested file name,
        'sd_hash': (str) sd hash of file,
        'download_path': (str) download path of file,
        'mime_type': (str) mime type of file,
        'key': (str) key attached to file,
        'total_bytes': (int) file size in bytes, None if full_status is false,
        'written_bytes': (int) written size in bytes,
        'blobs_completed': (int) num_completed, None if full_status is false,
        'blobs_in_stream': (int) None if full_status is false,
        'status': (str) downloader status, None if full_status is false,
        'claim_id': (str) claim id,
        'outpoint': (str) claim outpoint string,
        'txid': (str) claim txid,
        'nout': (int) claim nout,
        'metadata': (dict) claim metadata,
        'channel_claim_id': (str) None if claim is not signed
        'channel_name': (str) None if claim is not signed
        'claim_name': (str) claim name
    }
</code></pre><h2 id="help">help</h2>
<p>Return a useful message for an API command</p>
<h3 id="args-29">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>command</td>
<td>(str)</td>
<td></td>
<td>command to retrieve documentation for</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (str) Help message
</code></pre><h2 id="peer_list">peer_list</h2>
<p>Get peers for blob hash</p>
<h3 id="args-30">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>blob_hash</td>
<td>(str)</td>
<td>required</td>
<td>find available peers for this blob hash</td>
</tr>
<tr>
<td>timeout</td>
<td>(int)</td>
<td></td>
<td>peer search timeout in seconds</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (list) List of contact dictionaries {'host': &lt;peer ip&gt;, 'port': &lt;peer port&gt;, 'node_id': &lt;peer node id&gt;}
</code></pre><h2 id="peer_ping">peer_ping</h2>
<p>Find and ping a peer by node id</p>
<h3 id="args-31">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (str) pong, or {'error': &lt;error message&gt;} if an error is encountered
</code></pre><h2 id="publish">publish</h2>
<p>Make a new name claim and publish associated data to lbrynet,
update over existing claim if user already has a claim for name.</p>

<p>Fields required in the final Metadata are:
    'title'
    'description'
    'author'
    'language'
    'license'
    'nsfw'</p>

<p>Metadata can be set by either using the metadata argument or by setting individual arguments
fee, title, description, author, language, license, license_url, thumbnail, preview, nsfw,
or sources. Individual arguments will overwrite the fields specified in metadata argument.</p>
<h3 id="args-32">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>name</td>
<td>(str)</td>
<td>required</td>
<td>name of the content</td>
</tr>
<tr>
<td>bid</td>
<td>(float)</td>
<td>required</td>
<td>amount to back the claim</td>
</tr>
<tr>
<td>metadata</td>
<td>(dict)</td>
<td></td>
<td>ClaimDict to associate with the claim.</td>
</tr>
<tr>
<td>file_path</td>
<td>(str)</td>
<td></td>
<td>path to file to be associated with name. If provided,a lbry stream of this file will be used in 'sources'.If no path is given but a sources dict is provided,it will be used. If neither are provided, anerror is raised.</td>
</tr>
<tr>
<td>fee</td>
<td>(dict)</td>
<td></td>
<td>Dictionary representing key fee to download content:{'currency': currency_symbol,'amount': float,'address': str, optional}supported currencies: LBC, USD, BTCIf an address is not provided a new one will beautomatically generated. Default fee is zero.</td>
</tr>
<tr>
<td>title</td>
<td>(str)</td>
<td></td>
<td>title of the publication</td>
</tr>
<tr>
<td>description</td>
<td>(str)</td>
<td></td>
<td>description of the publication</td>
</tr>
<tr>
<td>author</td>
<td>(str)</td>
<td></td>
<td>author of the publication</td>
</tr>
<tr>
<td>language</td>
<td>(str)</td>
<td></td>
<td>language of the publication</td>
</tr>
<tr>
<td>license</td>
<td>(str)</td>
<td></td>
<td>publication license</td>
</tr>
<tr>
<td>license_url</td>
<td>(str)</td>
<td></td>
<td>publication license url</td>
</tr>
<tr>
<td>thumbnail</td>
<td>(str)</td>
<td></td>
<td>thumbnail url</td>
</tr>
<tr>
<td>preview</td>
<td>(str)</td>
<td></td>
<td>preview url</td>
</tr>
<tr>
<td>nsfw</td>
<td>(bool)</td>
<td></td>
<td>title of the publication</td>
</tr>
<tr>
<td>sources</td>
<td>(str)</td>
<td></td>
<td>{'lbry_sd_hash': sd_hash} specifies sd hash of file</td>
</tr>
<tr>
<td>channel_name</td>
<td>(str)</td>
<td></td>
<td>name of the publisher channel name in the wallet</td>
</tr>
<tr>
<td>channel_id</td>
<td>(str)</td>
<td></td>
<td>claim id of the publisher channel, does not checkfor channel claim being in the wallet. This allowspublishing to a channel where only the certificateprivate key is in the wallet.</td>
</tr>
<tr>
<td>claim_address</td>
<td>(str)</td>
<td></td>
<td>address where the claim is sent to, if not specifiednew address wil automatically be created</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (dict) Dictionary containing result of the claim
    {
        'tx' : (str) hex encoded transaction
        'txid' : (str) txid of resulting claim
        'nout' : (int) nout of the resulting claim
        'fee' : (float) fee paid for the claim transaction
        'claim_id' : (str) claim ID of the resulting claim
    }
</code></pre><h2 id="report_bug">report_bug</h2>
<p>Report a bug to slack</p>
<h3 id="args-33">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>message</td>
<td>(str)</td>
<td>required</td>
<td>Description of the bug</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (bool) true if successful
</code></pre><h2 id="resolve">resolve</h2>
<p>Resolve given LBRY URIs</p>
<h3 id="args-34">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>force</td>
<td>(bool)</td>
<td></td>
<td>force refresh and ignore cache</td>
</tr>
<tr>
<td>uri</td>
<td>(str)</td>
<td>required</td>
<td>uri to resolve</td>
</tr>
<tr>
<td>uris</td>
<td>(list)</td>
<td></td>
<td>uris to resolve</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    Dictionary of results, keyed by uri
    '&lt;uri&gt;': {
            If a resolution error occurs:
            'error': Error message

            If the uri resolves to a channel or a claim in a channel:
            'certificate': {
                'address': (str) claim address,
                'amount': (float) claim amount,
                'effective_amount': (float) claim amount including supports,
                'claim_id': (str) claim id,
                'claim_sequence': (int) claim sequence number,
                'decoded_claim': (bool) whether or not the claim value was decoded,
                'height': (int) claim height,
                'depth': (int) claim depth,
                'has_signature': (bool) included if decoded_claim
                'name': (str) claim name,
                'permanent_url': (str) permanent url of the certificate claim,
                'supports: (list) list of supports [{'txid': (str) txid,
                                                     'nout': (int) nout,
                                                     'amount': (float) amount}],
                'txid': (str) claim txid,
                'nout': (str) claim nout,
                'signature_is_valid': (bool), included if has_signature,
                'value': ClaimDict if decoded, otherwise hex string
            }

            If the uri resolves to a channel:
            'claims_in_channel': (int) number of claims in the channel,

            If the uri resolves to a claim:
            'claim': {
                'address': (str) claim address,
                'amount': (float) claim amount,
                'effective_amount': (float) claim amount including supports,
                'claim_id': (str) claim id,
                'claim_sequence': (int) claim sequence number,
                'decoded_claim': (bool) whether or not the claim value was decoded,
                'height': (int) claim height,
                'depth': (int) claim depth,
                'has_signature': (bool) included if decoded_claim
                'name': (str) claim name,
                'permanent_url': (str) permanent url of the claim,
                'channel_name': (str) channel name if claim is in a channel
                'supports: (list) list of supports [{'txid': (str) txid,
                                                     'nout': (int) nout,
                                                     'amount': (float) amount}]
                'txid': (str) claim txid,
                'nout': (str) claim nout,
                'signature_is_valid': (bool), included if has_signature,
                'value': ClaimDict if decoded, otherwise hex string
            }
    }
</code></pre><h2 id="resolve_name">resolve_name</h2>
<p>Resolve stream info from a LBRY name</p>
<h3 id="args-35">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>name</td>
<td>(str)</td>
<td>required</td>
<td>the name to resolve</td>
</tr>
<tr>
<td>force</td>
<td>(bool)</td>
<td></td>
<td>force refresh and do not check cache</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (dict) Metadata dictionary from name claim, None if the name is not
            resolvable
</code></pre><h2 id="routing_table_get">routing_table_get</h2>
<p>Get DHT routing information</p>
<h3 id="args-36">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (dict) dictionary containing routing and contact information
    {
        "buckets": {
            &lt;bucket index&gt;: [
                {
                    "address": (str) peer address,
                    "port": (int) peer udp port
                    "node_id": (str) peer node id,
                    "blobs": (list) blob hashes announced by peer
                }
            ]
        },
        "contacts": (list) contact node ids,
        "blob_hashes": (list) all of the blob hashes stored by peers in the list of buckets,
        "node_id": (str) the local dht node id
    }
</code></pre><h2 id="settings_get">settings_get</h2>
<p>Get daemon settings</p>
<h3 id="args-37">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (dict) Dictionary of daemon settings
    See ADJUSTABLE_SETTINGS in lbrynet/conf.py for full list of settings
</code></pre><h2 id="settings_set">settings_set</h2>
<p>Set daemon settings</p>
<h3 id="args-38">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>download_directory</td>
<td>(str)</td>
<td></td>
<td>path of download directory</td>
</tr>
<tr>
<td>data_rate</td>
<td>(float)</td>
<td></td>
<td>0.0001</td>
</tr>
<tr>
<td>download_timeout</td>
<td>(int)</td>
<td></td>
<td>180</td>
</tr>
<tr>
<td>peer_port</td>
<td>(int)</td>
<td></td>
<td>3333</td>
</tr>
<tr>
<td>max_key_fee</td>
<td>(dict)</td>
<td></td>
<td>maximum key fee for downloads,in the format:{'currency': <currency_symbol>,'amount': <amount>}.In the CLI, it must be an escaped JSON stringSupported currency symbols: LBC, USD, BTC</amount></currency_symbol></td>
</tr>
<tr>
<td>disable_max_key_fee</td>
<td>(bool)</td>
<td></td>
<td>False</td>
</tr>
<tr>
<td>use_upnp</td>
<td>(bool)</td>
<td></td>
<td>True</td>
</tr>
<tr>
<td>run_reflector_server</td>
<td>(bool)</td>
<td></td>
<td>False</td>
</tr>
<tr>
<td>cache_time</td>
<td>(int)</td>
<td></td>
<td>150</td>
</tr>
<tr>
<td>reflect_uploads</td>
<td>(bool)</td>
<td></td>
<td>True</td>
</tr>
<tr>
<td>share_usage_data</td>
<td>(bool)</td>
<td></td>
<td>True</td>
</tr>
<tr>
<td>peer_search_timeout</td>
<td>(int)</td>
<td></td>
<td>3</td>
</tr>
<tr>
<td>sd_download_timeout</td>
<td>(int)</td>
<td></td>
<td>3</td>
</tr>
<tr>
<td>auto_renew_claim_height_delta</td>
<td>(int)</td>
<td></td>
<td>0claims set to expire within this many blocks will beautomatically renewed after startup (if set to 0, renewswill not be made automatically)</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (dict) Updated dictionary of daemon settings
</code></pre><h2 id="status">status</h2>
<p>Get daemon status</p>
<h3 id="args-39">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>session_status</td>
<td>(bool)</td>
<td></td>
<td>include session status in results</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (dict) lbrynet-daemon status
    {
        'lbry_id': lbry peer id, base58,
        'installation_id': installation id, base58,
        'is_running': bool,
        'is_first_run': bool,
        'startup_status': {
            'code': status code,
            'message': status message
        },
        'connection_status': {
            'code': connection status code,
            'message': connection status message
        },
        'blockchain_status': {
            'blocks': local blockchain height,
            'blocks_behind': remote_height - local_height,
            'best_blockhash': block hash of most recent block,
        },
        'wallet_is_encrypted': bool,

        If given the session status option:
            'session_status': {
                'managed_blobs': count of blobs in the blob manager,
                'managed_streams': count of streams in the file manager
                'announce_queue_size': number of blobs currently queued to be announced
                'should_announce_blobs': number of blobs that should be announced
            }
    }
</code></pre><h2 id="stream_availability">stream_availability</h2>
<p>Get stream availability for lbry uri</p>
<h3 id="args-40">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>uri</td>
<td>(str)</td>
<td>required</td>
<td>check availability for this uri</td>
</tr>
<tr>
<td>search_timeout</td>
<td>(int)</td>
<td></td>
<td>how long to search for peers for the blobin the dht</td>
</tr>
<tr>
<td>blob_timeout</td>
<td>(int)</td>
<td></td>
<td>how long to try downloading from a peer</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (dict) {
        'is_available': &lt;bool&gt;,
        'did_decode': &lt;bool&gt;,
        'did_resolve': &lt;bool&gt;,
        'is_stream': &lt;bool&gt;,
        'num_blobs_in_stream': &lt;int&gt;,
        'sd_hash': &lt;str&gt;,
        'sd_blob_availability': &lt;dict&gt; see `blob_availability`,
        'head_blob_hash': &lt;str&gt;,
        'head_blob_availability': &lt;dict&gt; see `blob_availability`,
        'use_upnp': &lt;bool&gt;,
        'upnp_redirect_is_set': &lt;bool&gt;,
        'error': &lt;None&gt; | &lt;str&gt; error message
    }
</code></pre><h2 id="stream_cost_estimate">stream_cost_estimate</h2>
<p>Get estimated cost for a lbry stream</p>
<h3 id="args-41">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>uri</td>
<td>(str)</td>
<td>required</td>
<td>uri to use</td>
</tr>
<tr>
<td>size</td>
<td>(float)</td>
<td></td>
<td>stream size in bytes. if provided an sd blob won't bedownloaded.</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (float) Estimated cost in lbry credits, returns None if uri is not
        resolvable
</code></pre><h2 id="transaction_list">transaction_list</h2>
<p>List transactions belonging to wallet</p>
<h3 id="args-42">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (list) List of transactions

    {
        "claim_info": (list) claim info if in txn [{
                                                "address": (str) address of claim,
                                                "balance_delta": (float) bid amount,
                                                "amount": (float) claim amount,
                                                "claim_id": (str) claim id,
                                                "claim_name": (str) claim name,
                                                "nout": (int) nout
                                                }],
        "abandon_info": (list) abandon info if in txn [{
                                                "address": (str) address of abandoned claim,
                                                "balance_delta": (float) returned amount,
                                                "amount": (float) claim amount,
                                                "claim_id": (str) claim id,
                                                "claim_name": (str) claim name,
                                                "nout": (int) nout
                                                }],
        "confirmations": (int) number of confirmations for the txn,
        "date": (str) date and time of txn,
        "fee": (float) txn fee,
        "support_info": (list) support info if in txn [{
                                                "address": (str) address of support,
                                                "balance_delta": (float) support amount,
                                                "amount": (float) support amount,
                                                "claim_id": (str) claim id,
                                                "claim_name": (str) claim name,
                                                "is_tip": (bool),
                                                "nout": (int) nout
                                                }],
        "timestamp": (int) timestamp,
        "txid": (str) txn id,
        "update_info": (list) update info if in txn [{
                                                "address": (str) address of claim,
                                                "balance_delta": (float) credited/debited
                                                "amount": (float) absolute amount,
                                                "claim_id": (str) claim id,
                                                "claim_name": (str) claim name,
                                                "nout": (int) nout
                                                }],
        "value": (float) value of txn
    }
</code></pre><h2 id="transaction_show">transaction_show</h2>
<p>Get a decoded transaction from a txid</p>
<h3 id="args-43">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>txid</td>
<td>(str)</td>
<td>required</td>
<td>txid of the transaction</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (dict) JSON formatted transaction
</code></pre><h2 id="utxo_list">utxo_list</h2>
<p>List unspent transaction outputs</p>
<h3 id="args-44">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (list) List of unspent transaction outputs (UTXOs)
    [
        {
            "address": (str) the output address
            "amount": (float) unspent amount
            "height": (int) block height
            "is_claim": (bool) is the tx a claim
            "is_coinbase": (bool) is the tx a coinbase tx
            "is_support": (bool) is the tx a support
            "is_update": (bool) is the tx an update
            "nout": (int) nout of the output
            "txid": (str) txid of the output
        },
        ...
    ]
</code></pre><h2 id="version">version</h2>
<p>Get lbry version information</p>
<h3 id="args-45">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (dict) Dictionary of lbry version information
    {
        'build': (str) build type (e.g. "dev", "rc", "release"),
        'ip': (str) remote ip, if available,
        'lbrynet_version': (str) lbrynet_version,
        'lbryum_version': (str) lbryum_version,
        'lbryschema_version': (str) lbryschema_version,
        'os_release': (str) os release string
        'os_system': (str) os name
        'platform': (str) platform string
        'processor': (str) processor type,
        'python_version': (str) python version,
    }
</code></pre><h2 id="wallet_balance">wallet_balance</h2>
<p>Return the balance of the wallet</p>
<h3 id="args-46">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>address</td>
<td>(str)</td>
<td></td>
<td>If provided only the balance for thisaddress will be given</td>
</tr>
<tr>
<td>include_unconfirmed</td>
<td>(bool)</td>
<td></td>
<td>Include unconfirmed</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (float) amount of lbry credits in wallet
</code></pre><h2 id="wallet_decrypt">wallet_decrypt</h2>
<p>Decrypt an encrypted wallet, this will remove the wallet password</p>
<h3 id="args-47">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (bool) true if wallet is decrypted, otherwise false
</code></pre><h2 id="wallet_encrypt">wallet_encrypt</h2>
<p>Encrypt a wallet with a password, if the wallet is already encrypted this will update
the password</p>
<h3 id="args-48">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>new_password</td>
<td>(str)</td>
<td>required</td>
<td>password string to be used for encrypting wallet</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (bool) true if wallet is decrypted, otherwise false
</code></pre><h2 id="wallet_is_address_mine">wallet_is_address_mine</h2>
<p>Checks if an address is associated with the current wallet.</p>
<h3 id="args-49">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>address</td>
<td>(str)</td>
<td>required</td>
<td>address to check</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (bool) true, if address is associated with current wallet
</code></pre><h2 id="wallet_list">wallet_list</h2>
<p>List wallet addresses</p>
<h3 id="args-50">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    List of wallet addresses
</code></pre><h2 id="wallet_new_address">wallet_new_address</h2>
<p>Generate a new wallet address</p>
<h3 id="args-51">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (str) New wallet address in base58
</code></pre><h2 id="wallet_prefill_addresses">wallet_prefill_addresses</h2>
<p>Create new addresses, each containing <code>amount</code> credits</p>
<h3 id="args-52">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>no_broadcast</td>
<td>(bool)</td>
<td></td>
<td>whether to broadcast or not</td>
</tr>
<tr>
<td>num_addresses</td>
<td>(int)</td>
<td>required</td>
<td>num of addresses to create</td>
</tr>
<tr>
<td>amount</td>
<td>(float)</td>
<td>required</td>
<td>initial amount in each address</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (dict) the resulting transaction
</code></pre><h2 id="wallet_public_key">wallet_public_key</h2>
<p>Get public key from wallet address</p>
<h3 id="args-53">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>address</td>
<td>(str)</td>
<td>required</td>
<td>address for which to get the public key</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (list) list of public keys associated with address.
        Could contain more than one public key if multisig.
</code></pre><h2 id="wallet_send">wallet_send</h2>
<p>Send credits. If given an address, send credits to it. If given a claim id, send a tip
to the owner of a claim specified by uri. A tip is a claim support where the recipient
of the support is the claim address for the claim being supported.</p>
<h3 id="args-54">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>amount</td>
<td>(float)</td>
<td>required</td>
<td>amount of credit to send</td>
</tr>
<tr>
<td>address</td>
<td>(str)</td>
<td>required</td>
<td>address to send credits to</td>
</tr>
<tr>
<td>claim_id</td>
<td>(float)</td>
<td>required</td>
<td>claim_id of the claim to send to tip to</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    If sending to an address:
    (bool) true if payment successfully scheduled

    If sending a claim tip:
    (dict) Dictionary containing the result of the support
    {
        txid : (str) txid of resulting support claim
        nout : (int) nout of the resulting support claim
        fee : (float) fee paid for the transaction
    }
</code></pre><h2 id="wallet_unlock">wallet_unlock</h2>
<p>Unlock an encrypted wallet</p>
<h3 id="args-55">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
<tr>
<td>password</td>
<td>(str)</td>
<td>required</td>
<td>password for unlocking wallet</td>
</tr>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (bool) true if wallet is unlocked, otherwise false
</code></pre><h2 id="wallet_unused_address">wallet_unused_address</h2>
<p>Return an address containing no balance, will create
a new address if there is none.</p>
<h3 id="args-56">Args:</h3>
<table><thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead><tbody>
</tbody></table>

<blockquote>
<p>Returns:</p>
</blockquote>
<pre class="highlight plaintext"><code>    (str) Unused wallet address in base58
</code></pre>
      
      </div>
      <div class="dark-box">
      </div>
    </div>
  </div>

</template>

<script>

window.$ = window.jQuery = require('jquery');

require('jquery-ui');

require('jquery.tocify');

require('../js/jquery.highlight');

var lunr = require('lunr');

export default {
  data: function() {
    return {
      toc: {},
      searchIndex: {},
      content: {},
      searchResults: {}
    };
  },
  methods: {
    makeToc: function() {

      this.toc = $("#toc").tocify({
        selectors: 'h2,h3,h4,h5,h6',
        extendPage: false,
        theme: 'none',
        smoothScroll: false,
        showEffectSpeed: 0,
        hideEffectSpeed: 180,
        ignoreSelector: '.toc-ignore',
        highlightOffset: 60,
        scrollTo: -1,
        scrollHistory: false,
        hashGenerator: function (text, element) {
          return element.prop('id');
        }
      }).data('toc-tocify');

      $("#nav-button").click(function() {
        $(".tocify-wrapper").toggleClass('open');
        $("#nav-button").toggleClass('open');
        return false;
      });

      $(".page-wrapper").click(this.closeToc);
      $(".tocify-item").click(this.closeToc);

    },
    closeToc: function() {

      $(".tocify-wrapper").removeClass('open');
      $("#nav-button").removeClass('open');

    },
    populateSearchIndex: function() {

      var component = this;

      $('h2,h3,h4,h5,h6').each(function() {
        var title = $(this);
        var body = title.nextUntil('h2,h3,h4,h5,h6');
        component.searchIndex.add({
          id: title.prop('id'),
          title: title.text(),
          body: body.text()
        });
      });

    },
    bindSearchIndex: function() {

      this.content = $('.whiteboard .content');
      this.searchResults = $('.whiteboard .search-results');   

      $('#input-search').on('keyup', this.search);

    },
    search: function(event) {

      var component = this;

      component.unhighlight();
      component.searchResults.addClass('visible');

      var searchElement = $("#input-search");

      // ESC clears the field
      if (event.keyCode === 27) searchElement.val('');

      if (searchElement.val()) {
        var results = component.searchIndex.search(searchElement.val()).filter(function(r) {
          return r.score > 0.0001;
        });

        if (results.length) {
          component.searchResults.empty();
          $.each(results, function (index, result) {
            var elem = document.getElementById(result.ref);
            component.searchResults.append("<li><a href='#" + result.ref + "'>" + $(elem).text() + "</a></li>");
          });
          component.highlight(this);
        } else {
          component.searchResults.html('<li></li>');
          $('.search-results li').text('No Results Found for "' + searchElement.val() + '"');
        }
      } else {
        component.unhighlight();
        component.searchResults.removeClass('visible');
      }
    },
    highlight: function(element) {
      if (element.value) this.content.highlight(element.value, { element: 'span', className: 'search-highlight' });
    },
    unhighlight: function() {
      this.content.unhighlight({ element: 'span', className: 'search-highlight' });
    }
  },
  mounted: function() {

    this.makeToc();

    this.searchIndex = new lunr.Index();

    this.searchIndex.ref('id');
    this.searchIndex.field('title', { boost: 10 });
    this.searchIndex.field('body');
    this.searchIndex.pipeline.add(lunr.trimmer, lunr.stopWordFilter);

    this.populateSearchIndex();

    this.bindSearchIndex();

  },
  name: 'Whiteboard'
};
</script>

<style lang="scss">
  
  @import "../../../node_modules/highlight.js/styles/monokai-sublime";
  @import "../scss/partials/whiteboard_variables";
  @import "../scss/partials/whiteboard_icons";
  @import "../scss/partials/whiteboard_style";

</style>