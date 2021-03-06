# radio-stream

This is the live streaming portion of opensourceradio. It is heavily inspired by [live-stream-radio](https://github.com/torch2424/live-stream-radio) which was what I was originally using.
This rewrite allows for a bit more to be built ontop of the stream, primarily scheduling.

The stream works on an interval loop that repeats after every song. The app holds internal state and will continue to run a scheduled block of music. 
If an active schedule is not found, it defaults to looping randomly through the entire audio library.

## basic usage

throw some mp3s in the `assets/audio` directory then:

```
npm install
node index.js
```

## scheduling

A schedule represents a block of programming in the stream. It defines a `start_time`, a `length` in time in which it will run, and an ordered `playlist` of mp3 files to stream.
schedules are stored in a sql database. a json representation would be:

```json
{
 "id": 1,
 "name": "example",
 "description": "an example playlist",
 "start_time": "YYYY-MM-DD HH:mm:ss",
 "length": 0.5, // a half hour
 "playlist": "example.mp3,example2.mp3" //comma seperated list of mp3 files in the audio directory
}
```

If the elapsed time of a playlist is shorter than the block of time allotted to the schedule, it will loop back over to the beginning.