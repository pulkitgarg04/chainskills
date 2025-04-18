import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Briefcase, Star, Award, Clock, MessageSquare } from "lucide-react"
import Header from "../../components/dashboard/Header"
import FreelancerJobList from "../../components/FreelancerJobList"
import FreelancerApplications from "../../components/FreelancerApplications"
import FreelancerCertifications from "../../components/FreelancerCertifications"
import { getUserProfileData } from "../../lib/freelancer"
import { ethers } from "ethers"

export default function FreelancerDashboard() {
  const [freelancerProfile, setFreelancerProfile] = useState({
    name: "",
    title: "",
    hourlyRate: "0.0",
    skills: [],
    completedJobs: 0,
    rating: 0,
    earnings: "0.0",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUserProfileData();
      console.log("Result: ", result);

      setFreelancerProfile({
        name: result[1],
        title: result[6],
        hourlyRate: ethers.formatUnits(result[5], 18),
        skills: result[3],
        completedJobs: Number(result[9], 10),
        rating: Number(result[7], 10),
        earnings: Number(result[8]),
      });

      console.log("Freelancer profile", freelancerProfile);
    }

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="grid gap-6 md:grid-cols-[1fr_3fr] bg-black pt-10 px-10">
        <div className="space-y-6">
          <Card className="border-2 border-emerald-200 bg-black">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" alt={freelancerProfile.name} />
                  <AvatarFallback className="bg-emerald-200 text-xl font-semibold">{"P"}</AvatarFallback>
                </Avatar>
                <a href="/dashboard/freelancer/edit-profile">
                  <Button className="bg-emerald-400 border-0 hover:bg-emerald-300 cursor-pointer" variant="outline" size="sm">
                    Edit Profile
                  </Button>
                </a>
              </div>
              <CardTitle className="mt-4 text-emerald-300 text-2xl">{freelancerProfile.name}</CardTitle>
              <CardDescription className="text-gray-300">{freelancerProfile.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-emerald-300">Hourly Rate</div>
                  <div className="text-2xl font-bold text-white">ETH. {freelancerProfile.hourlyRate}</div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2 text-emerald-300">Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {freelancerProfile.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm text-gray-300">
                      <span className="font-medium">{freelancerProfile.completedJobs}</span> Jobs
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm text-gray-300">
                      <span className="font-medium">{freelancerProfile.rating}</span> Rating
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm text-gray-300">
                      <span className="font-medium">{freelancerProfile.certifications}</span> NFTs
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm text-gray-300">UTC+05:30</div>
                  </div>
                </div>

                <a href="/dashboard/messages">
                  <Button variant="outline" className="w-full gap-2 cursor-pointer">
                    <MessageSquare className="h-4 w-4" />
                    Messages
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-emerald-200 bg-black">
            <CardHeader>
              <CardTitle className="text-lg text-emerald-400">Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">ETH. {freelancerProfile.earnings}</div>
              <p className="text-sm text-emerald-400 mt-1 ">Total earnings</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Tabs defaultValue="jobs">
            <TabsList className="grid w-full grid-cols-3 bg-emerald-200">
              <TabsTrigger value="jobs">Available Jobs</TabsTrigger>
              <TabsTrigger value="applications">My Applications</TabsTrigger>
              <TabsTrigger value="certifications">My Certifications</TabsTrigger>
            </TabsList>
            <TabsContent value="jobs" className="mt-4">
              <FreelancerJobList />
            </TabsContent>
            <TabsContent value="applications" className="mt-4">
              <FreelancerApplications />
            </TabsContent>
            <TabsContent value="certifications" className="mt-4">
              <FreelancerCertifications />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}