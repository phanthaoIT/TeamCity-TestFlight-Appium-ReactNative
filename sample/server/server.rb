require 'webrick'
require 'net/http'
require 'uri'
require 'json'
require 'net/https' if RUBY_VERSION < '1.9'
require 'base64'

$teamcity_username = '<YOUR_TC_USERNAME>'
$teamcity_password = '<YOUR_TC_PASSWORD>'
$build_id = '<YOUR_BUILD_ID>'
$server = 'YOUR_HOST_TEAMCITY'
$port =  3000

class Server < WEBrick::HTTPServlet::AbstractServlet
    def do_POST(request,response)
      web_hook_data = JSON.parse(request.body)
      puts web_hook_data
      if web_hook_data["type"] == "app_version"
        url = get_build_url (web_hook_data)
        puts teamcity(url)
      elsif web_hook_data["type"] == "ping"
        puts "Ping request received" 
      else
        puts request.body
        response.body = "Unsupported Type"
      end
    end

    def get_build_url (json_data)
        return json_data["app_version"]["build_url"]
    end
end
  def escape(url)
    url = url.gsub(/&/,"&amp;")
    url = url.gsub(/</,"&lt;")
    url = url.gsub(/>/,"&gt;")
    url = url.gsub(/"/,"&quot;")
    url = url.gsub(/'/,"&apos;")
    return url   
  end
  def teamcity(url)
      uri = URI.parse($server + `/app/rest/latest/buildQueue/`)
      req = Net::HTTP.new(uri.host, uri.port)
      url = escape(url)
      xml = "<build><buildType id='#{$build_id}'/><properties><property name='env.KOBITON_SESSION_APPLICATION_URL' value='#{url}'/></properties></build>"
      puts xml
      header = {
          'Content-Type' => 'application/xml',
          'Origin' => $server,
          "Authorization" => "Basic " + Base64.encode64($teamcity_username + ":" + $teamcity_password).chomp
      }
      res = req.post(uri.path,xml,header)
      puts res.body   
  end
  
  server = WEBrick::HTTPServer.new(:Port => $port)
  server.mount "/", Server
  
  trap 'INT' do
    server.shutdown
  end
  
  server.start
