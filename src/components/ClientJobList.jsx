"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

// const mockAvailableJobs = [
//     {
//         id: "job1",
//         title: "Smart Contract Developer for DeFi Project",
//         companyName: "DeFi Innovations",
//         description:
//             "We're looking for an experienced Solidity developer to help build our decentralized finance platform. The ideal candidate will have experience with ERC-20 tokens, liquidity pools, and yield farming mechanisms.",
//         skills: ["Solidity", "Smart Contracts", "DeFi", "Web3"],
//         jobType: "fixed",
//         budget: 5000,
//         experienceLevel: "Expert",
//         duration: "2 months",
//         postedAt: "2 days ago",
//     },
//     {
//         id: "job2",
//         title: "Frontend Developer for NFT Marketplace",
//         companyName: "CryptoArt Collective",
//         description:
//             "We need a React developer to build the frontend of our NFT marketplace. You'll be working with our design team to create a beautiful and intuitive user interface for browsing, buying, and selling NFTs.",
//         skills: ["React", "JavaScript", "Web3", "UI/UX"],
//         jobType: "hourly",
//         budget: 50,
//         experienceLevel: "Intermediate",
//         duration: "3 months",
//         postedAt: "1 week ago",
//     },
//     {
//         id: "job3",
//         title: "Blockchain Security Auditor",
//         companyName: "SecureChain",
//         description:
//             "Looking for a security expert to audit our smart contracts before deployment. Must have experience with common vulnerabilities and attack vectors in blockchain applications.",
//         skills: ["Security", "Solidity", "Smart Contracts", "Auditing"],
//         jobType: "fixed",
//         budget: 3000,
//         experienceLevel: "Expert",
//         duration: "2 weeks",
//         postedAt: "3 days ago",
//     },
// ]

const mockClientJobs = [
    {
        id: "job1",
        title: "Web3 Integration Specialist",
        description: "Need help integrating our existing web application with Web3 wallets and smart contracts.",
        skills: ["JavaScript", "React", "Web3", "Ethereum"],
        jobType: "hourly",
        budget: 60,
        postedAt: "1 week ago",
        status: "active",
        applicantsCount: 12,
    },
    {
        id: "job2",
        title: "Solidity Smart Contract Developer",
        description: "Looking for an experienced Solidity developer to create custom smart contracts for our NFT platform.",
        skills: ["Solidity", "Smart Contracts", "NFT", "ERC-721"],
        jobType: "fixed",
        budget: 4000,
        postedAt: "2 weeks ago",
        status: "active",
        applicantsCount: 8,
    },
    {
        id: "job3",
        title: "Blockchain Technical Writer",
        description: "Need someone to create technical documentation for our blockchain project.",
        skills: ["Technical Writing", "Blockchain", "Documentation"],
        jobType: "hourly",
        budget: 40,
        postedAt: "3 weeks ago",
        status: "closed",
        applicantsCount: 5,
    },
]

export default function ClientJobList() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                // const jobsData = await getClientJobs()
                setJobs(mockClientJobs)
            } catch (error) {
                console.error("Error fetching jobs:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchJobs()
    }, [])

    if (loading) {
        return <div className="flex justify-center p-8">Loading your job listings...</div>
    }

    if (jobs.length === 0) {
        return (
            <div className="text-center p-8">
                <h3 className="text-lg font-medium">No job listings yet</h3>
                <p className="text-muted-foreground mt-2">Post a job to start hiring talent</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {jobs.map((job) => (
                <Card key={job.id}>
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle>{job.title}</CardTitle>
                                <CardDescription>Posted {job.postedAt}</CardDescription>
                            </div>
                            <Badge variant={job.status === "active" ? "default" : job.status === "closed" ? "secondary" : "outline"}>
                                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm line-clamp-2 mb-4">{job.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {job.skills.map((skill) => (
                                <Badge key={skill} variant="secondary">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                        <div className="flex justify-between text-sm">
                            <div>
                                <span className="text-muted-foreground">Budget: </span>
                                <span className="font-medium">
                                    {job.jobType === "fixed" ? `$${job.budget} fixed` : `$${job.budget}/hr`}
                                </span>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Applicants: </span>
                                <span className="font-medium">{job.applicantsCount}</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 border-t pt-4">
                        <Button variant="outline">Edit</Button>
                        {job.status === "active" ? (
                            <Button variant="destructive">Close Job</Button>
                        ) : job.status === "draft" ? (
                            <Button>Publish</Button>
                        ) : (
                            <Button>Reopen</Button>
                        )}
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}