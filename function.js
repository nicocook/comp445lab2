// array to store metrics for later analysis
const totalMetrics = [];

setInterval(() => {
  // dashMetrics object to access buffer and requests
  const dashMetrics = player.getDashMetrics();

  // buffer level in seconds
  const bufferLevel = dashMetrics.getCurrentBufferLevel('video');

  // throughput in Kbps, convert to Mbps
  const avgThroughputKbps = player.getAverageThroughput('video', null, 4);
  const throughputMbps = avgThroughputKbps / 1000;

  // get last 4 http requests
  const requests = dashMetrics.getHttpRequests('video').slice(-4);

  let totalLatency = 0;
  requests.forEach(req => {
    totalLatency += (req.tresponse - req.trequest); // subtract request time from response time to get latency, add to total
  });
  const avgLatency = totalLatency / 4; // divide total by number of requests (4) for average

  // build and log metrics
  const metrics = {
      timestamp: new Date().toISOString(),
      bufferLevel: bufferLevel.toFixed(2),
      throughput: throughputMbps.toFixed(2),
      latency: avgLatency.toFixed(2)         
  };

  totalMetrics.push(metrics);

  console.log('DASH Metrics:', metrics);
}, 8000);

