import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAnalytics } from "@/actions/analytics";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default async function AnalyticsPage() {
  const { totalTestimonials, testimonialsByBoard, testimonialsTrend } =
    await getAnalytics();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>

      <Card>
        <CardHeader>
          <CardTitle>Total Testimonials</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{totalTestimonials}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Testimonials by Board</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={testimonialsByBoard}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Testimonials Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={testimonialsTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
