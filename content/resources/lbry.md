---
title: LBRY OpenAPI Specification
---



```yaml
openapi: "3.0.0"
info:
  version: 1.0.0
  title: LBRY
  license:
    name: MIT
servers:
  - url: http://lbry.swagger.io/v1
paths:
  /blob_announce:
    get:
      summary: Announce blobs to the DHT
      operationId: blobAnnounce
      tags:
        - blob
      parameters:
        - name: blob_hash
          in: query
          description: announce a blob, specified by blob_hash
          required: false
          schema:
            type: string
        - name: stream_hash
          in: query
          description: announce all blobs associated with stream_hash
          required: false
          schema:
            type: string
        - name: sd_hash
          in: query
          description: announce all blobs associated with sd_hash and the sd_hash itself
          required: false
          schema:
            type: string
      responses:
        true:
          description: A paged array of pets
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Blob"
        default:
          description: unsuccessful announcement
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
```
