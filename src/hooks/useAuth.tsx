
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

export type UserRole = 'patient' | 'hospital' | 'admin';
export type AccountStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
  policyNumber?: string; // For patients
  hospitalName?: string; // For hospitals
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  approveUser: (userId: string) => Promise<void>;
  rejectUser: (userId: string) => Promise<void>;
  getPendingUsers: () => User[];
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  policyNumber?: string;
  hospitalName?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Load current user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Load all users
    const storedAllUsers = localStorage.getItem('allUsers');
    if (storedAllUsers) {
      setAllUsers(JSON.parse(storedAllUsers));
    } else {
      // Initialize with demo accounts as approved users if no users exist
      const initialUsers: User[] = [
        {
          id: '1',
          name: 'John Patient',
          email: 'patient@example.com',
          role: 'patient',
          status: 'approved',
          policyNumber: 'POL-123456'
        },
        {
          id: '2',
          name: 'City Hospital',
          email: 'hospital@example.com',
          role: 'hospital',
          status: 'approved',
          hospitalName: 'City General Hospital'
        },
        {
          id: '3',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
          status: 'approved'
        },
        {
          id: '4',
          name: 'Alice Roberts',
          email: 'alice.roberts@example.com',
          role: 'patient',
          status: 'approved',
          policyNumber: 'POL-654321'
        },
        {
          id: '5',
          name: 'David Kumar',
          email: 'david.kumar@example.com',
          role: 'patient',
          status: 'approved',
          policyNumber: 'POL-654322'
        },
        {
          id: '6',
          name: 'Priya Singh',
          email: 'priya.singh@example.com',
          role: 'patient',
          status: 'approved',
          policyNumber: 'POL-654323'
        }
      ];
      
      setAllUsers(initialUsers);
      localStorage.setItem('allUsers', JSON.stringify(initialUsers));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Find user in our stored users
      const foundUser = allUsers.find(u => u.email === email);
      
      if (foundUser && password === 'password') { // In real app, use proper password comparison
        // Check if account is approved
        if (foundUser.status === 'pending') {
          toast({
            title: "Account pending approval",
            description: "Your account is waiting for admin approval. Please check back later.",
            variant: "destructive"
          });
          return;
        } else if (foundUser.status === 'rejected') {
          toast({
            title: "Account access denied",
            description: "Your account registration was rejected. Please contact support.",
            variant: "destructive"
          });
          return;
        }
        
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        toast({
          title: "Login successful",
          description: "Welcome back, " + foundUser.name
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      // Check if email already exists
      const emailExists = allUsers.some(u => u.email === userData.email);
      if (emailExists) {
        toast({
          title: "Registration failed",
          description: "Email already in use",
          variant: "destructive"
        });
        return;
      }
      
      // Create new user with pending status
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        status: 'pending', // All new accounts start as pending
        policyNumber: userData.policyNumber,
        hospitalName: userData.hospitalName
      };
      
      // Add to users list
      const updatedUsers = [...allUsers, newUser];
      setAllUsers(updatedUsers);
      localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
      
      toast({
        title: "Registration successful",
        description: "Your account is pending approval by an administrator"
      });
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  const approveUser = async (userId: string) => {
    try {
      const updatedUsers = allUsers.map(u => 
        u.id === userId ? { ...u, status: 'approved' as AccountStatus } : u
      );
      setAllUsers(updatedUsers);
      localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
      
      toast({
        title: "User approved",
        description: "The user can now log in to their account"
      });
      return Promise.resolve();
    } catch (error) {
      console.error('Approval error:', error);
      toast({
        title: "Approval failed",
        description: "An unexpected error occurred"
      });
      return Promise.reject(error);
    }
  };

  const rejectUser = async (userId: string) => {
    try {
      const updatedUsers = allUsers.map(u => 
        u.id === userId ? { ...u, status: 'rejected' as AccountStatus } : u
      );
      setAllUsers(updatedUsers);
      localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
      
      toast({
        title: "User rejected",
        description: "The user has been denied access"
      });
      return Promise.resolve();
    } catch (error) {
      console.error('Rejection error:', error);
      toast({
        title: "Rejection failed",
        description: "An unexpected error occurred"
      });
      return Promise.reject(error);
    }
  };

  const getPendingUsers = () => {
    return allUsers.filter(u => u.status === 'pending');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout,
      isAuthenticated: !!user,
      approveUser,
      rejectUser,
      getPendingUsers
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
