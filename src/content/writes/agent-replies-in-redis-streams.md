---
title: Why our agent replies live in Redis Streams
description: Chained live connections kept losing answers. An ordered stream keyed by request ID fixed it.
date: 2026-11-05
topic: Backend
minutes: 7
icon: stream
order: 2
tags: [Backend, Agents]
---

_Outline. This post is still being written._

- The original flow: a chain of live connections from the browser to the agent.
- What broke: one dropped hop and the whole answer was gone.
- The fix: the request goes out, and the reply comes back as an ordered stream keyed by request ID.
- Why a stream and not the message broker we already had for requests.
- What I'd do differently: design for replay from day one.
